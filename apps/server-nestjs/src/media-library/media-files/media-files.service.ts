import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { MediaLibraryScannerService } from '../media-library-scanner/media-library-scanner.service';
import { DrizzleAsyncProvider } from '../../drizzle/drizzle.provider';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js/index';
import * as schema from '../../drizzle/schema';
import { eq, isNull } from 'drizzle-orm';
import * as path from 'path';
import { mediaFile, movies } from '../../drizzle/schema';

@Injectable()
export class MediaFilesService {
  constructor(
    private mediaLibraryScanner: MediaLibraryScannerService,
    @Inject(DrizzleAsyncProvider) private db: PostgresJsDatabase<typeof schema>,
  ) {}

  async index() {
    const absolutePaths = await this.mediaLibraryScanner.scan();

    // remove library path from file path
    const paths = absolutePaths.map((path) =>
      this.mediaLibraryScanner.relativePath(path),
    );

    // check if file is already in db
    const uploaded = await this.db.query.mediaFile.findMany({
      where: (fileUpload, { inArray }) => inArray(fileUpload.path, paths),
    });

    // add files that are not in db
    const toUpload = paths.filter(
      (path) => !uploaded.some((u) => u.path === path),
    );

    // add the files to database, which aren't already
    await this.createFromPathList(toUpload);
  }

  private async createFromPathList(paths: string[]) {
    if (paths.length === 0) return;

    await this.db.insert(schema.mediaFile).values(
      paths.map((p) => ({
        path: p,
      })),
    );
  }

  /**
   * # Find missing movie
   * This method returns all mediaFiles which are not linked to a movie yet.
   * @returns - A list of mediaFiles which are not linked to a movie
   */
  async findMissingMovie() {
    return await this.db.query.mediaFile.findMany({
      where: isNull(schema.mediaFile.movieId),
    });
  }

  async linkToMovie(file: { path: string }, movie: { id: number }) {
    await this.db
      .update(schema.mediaFile)
      .set({ movieId: movie.id })
      .where(eq(mediaFile.path, file.path));
  }

  async getMediaFile(id: number) {
    const mediaFile = await this.db.query.mediaFile.findFirst({
      where: eq(schema.mediaFile.id, id),
      with: {
        movie: true,
      },
    });

    if (!mediaFile) {
      throw new NotFoundException();
    }

    mediaFile.path = 'http://localhost:3000/static/library/' + mediaFile.path;

    return mediaFile;
  }
}
