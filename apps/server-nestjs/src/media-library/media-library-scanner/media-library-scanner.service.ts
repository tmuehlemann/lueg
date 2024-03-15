import { Injectable } from '@nestjs/common';
import { join } from 'path';
import * as process from 'process';
import { glob } from 'glob';

@Injectable()
export class MediaLibraryScannerService {
  mediaLibrary = '/static/library';

  get absoluteMediaLibrary() {
    const projectRoot = process.cwd();
    return join(projectRoot, this.mediaLibrary);
  }

  async scan() {
    const files = await glob(this.absoluteMediaLibrary + '/**/*.{mkv,mp4}');

    return files;
  }

  // todo: Filename parsing could be its own service. Also, there has to be a nicer way of doing this
  parseFilename(filename: string): { names: string[]; years: number[] } {
    return {
      names: this.parseNameFromFilename(filename),
      years: this.parseYearsFromFilename(filename),
    };
  }

  parseNameFromFilename(filename: string) {
    // remove file extension
    let movieName = filename
      .replace(/\.[^/.]+$/, '')

      // Replace all dots with spaces
      .replace(/\./g, ' ')

      // check for quality and remove everything after it
      .replace(/[({\[]?(?:480|720|1080|2160)[pi].*/, '')
      .replace(/[({\[]?(?:HD|SD|4k).*/, '')

      // check for codec and remove everything after it
      .replace(/[({\[]?(?:x264|x265|avc|hevc).*/, '')
      .trim();

    // count years in movie name
    const yearCount = (movieName.match(/(?:19|20)\d{2}/g) || []).length;

    let res = new Set<string>();
    if (movieName.length > 4) {
      if (yearCount == 1) {
        // uncertain if year is part of movie name or not
        res.add(movieName.trim());
      }

      // remove only year if ends with year, includes if year is in brackets
      movieName = movieName.replace(
        /([({\[]?(?:19|20)\d{2}[)}\]]?$|[({\[](?:19|20)\d{2}[)}\]]).*/,
        '',
      );
      res.add(movieName.trim());

      // remove year and everything after it
      movieName = movieName.replace(/([({\[]?(?:19|20)\d{2}[)}\]]?).*/, '');
      res.add(movieName.trim());
    } else {
      res.add(movieName.trim());
    }

    // remove empty strings
    res.delete('');

    return Array.from(res);
  }

  parseYearsFromFilename(filename: string) {
    const years = new Set<number>();

    const yearMatch = filename.match(/(?:19|20)\d{2}/g);
    if (yearMatch) {
      yearMatch.forEach((y) => years.add(parseInt(y)));
    }

    // remove all years in the future
    const currentYear = new Date().getFullYear();
    Array.from(years).forEach((y) => {
      if (y > currentYear) {
        years.delete(y);
      }
    });

    return Array.from(years).reverse();
  }

  relativePath(path: string): string {
    return removeStartsWith(path, this.absoluteMediaLibrary);
  }
}

function removeStartsWith(inputString, prefix) {
  if (inputString.startsWith(prefix)) {
    return inputString.substring(prefix.length);
  }
  return inputString;
}
