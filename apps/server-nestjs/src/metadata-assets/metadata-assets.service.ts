import { Injectable } from '@nestjs/common';
import * as process from 'process';
import { join } from 'path';
import * as sharp from 'sharp';

@Injectable()
export class MetadataAssetsService {
  private metadata_assets_path = '/static/metadata';

  async downloadPoster(url: string, filename: string) {
    const buffer = await this.fetchFile(url);

    filename = this.safeFilename(filename);

    const base = join(process.cwd(), this.metadata_assets_path, '/posters');
    const originalPoster = join(base, filename + '.jpg');
    const scaledPoster = join(base, '/320', filename + '.webp');

    await Promise.all([
      sharp(buffer).toFile(originalPoster),
      sharp(buffer).resize(320).webp().toFile(scaledPoster),
    ]);

    return filename;
  }

  async downloadBackdrops(url: string, filename: string): Promise<string> {
    const buffer = await this.fetchFile(url);

    filename = this.safeFilename(filename);

    const base = join(process.cwd(), this.metadata_assets_path, '/backdrops');
    const originalBackdrop = join(base, filename + '.jpg');

    await sharp(buffer).toFile(originalBackdrop);

    return filename;
  }

  private async fetchFile(url: string) {
    const response = await fetch(url);

    if (!response.ok) throw new Error();

    return await response.arrayBuffer();
  }

  private safeFilename(filename: string) {
    return filename.replace(/[^a-zA-Z0-9-_]/g, '_');
  }
}
