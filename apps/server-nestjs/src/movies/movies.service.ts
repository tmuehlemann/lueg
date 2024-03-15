import { Inject, Injectable, Logger } from '@nestjs/common';
import { DrizzleAsyncProvider } from '../drizzle/drizzle.provider';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js/index';
import * as schema from '../drizzle/schema';
import { MediaLibraryScannerService } from '../media-library/media-library-scanner/media-library-scanner.service';
import { basename } from 'path';
import { MediaFilesService } from '../media-library/media-files/media-files.service';
import { TmdbMovie, TmdbQuery } from '../metadata-apis/tmdb/tmdb.schema';
import { TmdbService } from '../metadata-apis/tmdb/tmdb.service';
import { MetadataAssetsService } from '../metadata-assets/metadata-assets.service';
import { eq } from 'drizzle-orm';

@Injectable()
export class MoviesService {
  private logger = new Logger(MoviesService.name);
  constructor(
    @Inject(DrizzleAsyncProvider) private db: PostgresJsDatabase<typeof schema>,
    private mediaLibraryScanner: MediaLibraryScannerService,
    private mediaFilesService: MediaFilesService,
    private tmdbService: TmdbService,
    private metadataAssets: MetadataAssetsService,
  ) {}

  async list() {
    const movies = await this.db.query.movies.findMany({});

    return movies;
  }

  async syncWithMediaLibrary() {
    await this.mediaFilesService.index();
    const mediaFiles = await this.mediaFilesService.findMissingMovie();

    for (const mediaFile of mediaFiles) {
      let movie;
      try {
        movie = await this.createMovieFromMediaFile(mediaFile);
      } catch (e) {
        this.logger.warn('could not create movie', e);
      }

      if (movie) {
        let values: { backdropPath?: string; posterPath?: string } = {};

        if (movie.backdropPath) {
          values.backdropPath =
            'local:' +
            (await this.metadataAssets.downloadBackdrops(
              'https://image.tmdb.org/t/p/original' + movie.backdropPath,
              movie.title,
            ));
        }

        if (movie.posterPath) {
          values.posterPath =
            'local:' +
            (await this.metadataAssets.downloadPoster(
              'https://image.tmdb.org/t/p/original' + movie.posterPath,
              movie.title,
            ));
        }

        if (Object.keys(values).length > 0) {
          await this.db
            .update(schema.movies)
            .set(values)
            .where(eq(schema.movies.id, movie.id));
        }
      }
    }
  }

  private async createMovieFromMediaFile(mediaFile: { path: string }) {
    // todo:
    // - download poster/backdrop
    //    - resize files
    // - use transaction
    // - inform user via websockets

    const movieId = await this.parseAndIdentifyMoviePath(mediaFile.path);

    if (movieId === null) {
      this.logger.warn(`could not identify movie ${mediaFile.path}`);
      return;
    }

    const metadata = await this.tmdbService.getMovieDetails(movieId);
    const movie = await this.create(metadata);
    await this.mediaFilesService.linkToMovie(mediaFile, movie);
    return movie;
  }

  /** parseAndIdentifyMoviePath
   * 1. parses Filename
   * 2. searches on tmdb for the movie
   *
   * @param path - just a string to the movie file
   * @private
   */
  private async parseAndIdentifyMoviePath(
    path: string,
  ): Promise<number | null> {
    const filename = basename(path);
    const { names, years } = this.mediaLibraryScanner.parseFilename(filename);

    let tmdbResponse: TmdbQuery | null = null;

    // search all combinations with years first
    for (const name of names) {
      for (const year of years) {
        if (tmdbResponse?.results?.length) {
          break;
        }

        tmdbResponse = await this.tmdbService.queryMovie(name, year);
      }
    }

    if (!tmdbResponse) {
      for (const name of names) {
        if (tmdbResponse?.results?.length) {
          break;
        }

        tmdbResponse = await this.tmdbService.queryMovie(name);
      }
    }

    if (tmdbResponse?.results?.length) {
      return tmdbResponse.results[0].id;
    }

    return null;
  }

  private async create(metadata: TmdbMovie) {
    const movieColors = {
      fg: '#ffffff',
      bg: '#000000',
      primary: '#ffa1de',
    };

    this.logger.log(`added new movie ${metadata.title}`);

    // store metadata in database
    const resp = await this.db
      .insert(schema.movies)
      .values({
        originalLanguage: metadata.original_language,
        originalTitle: metadata.original_title,
        overview: metadata.overview,
        releaseDate: metadata.release_date.toISOString(),
        status: metadata.status,
        title: metadata.title,
        tmdbId: metadata.id,
        imdbId: metadata.imdb_id,
        posterPath: metadata.poster_path,
        revenue: metadata.revenue,
        runtime: metadata.runtime,
        tagline: metadata.tagline,
        backdropPath: metadata.backdrop_path,
        budget: metadata.budget,
        fgColor: movieColors.fg,
        bgColor: movieColors.bg,
        primaryColor: movieColors.primary,
      })
      .returning();

    const movie = resp[0];

    this.db.insert(schema.movieToGenre).values(
      metadata.genres.map((genre) => ({
        movieId: movie.id,
        genreId: genre.id,
      })),
    );

    return movie;
  }
}
