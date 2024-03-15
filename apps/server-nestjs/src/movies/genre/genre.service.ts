import { Inject, Injectable } from '@nestjs/common';
import { TmdbService } from '../../metadata-apis/tmdb/tmdb.service';
import { DrizzleAsyncProvider } from '../../drizzle/drizzle.provider';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js/index';
import * as schema from '../../drizzle/schema';
import { TmdbGenre } from '../../metadata-apis/tmdb/tmdb.schema';

@Injectable()
export class GenreService {
  /**
   * synchronizes the genres in database with those from tmdb
   */

  constructor(
    private tmdbService: TmdbService,
    @Inject(DrizzleAsyncProvider) private db: PostgresJsDatabase<typeof schema>,
  ) {}

  async sync() {
    let genres: TmdbGenre[] = [];

    try {
      genres = await this.tmdbService.getMovieGenres();
    } catch (e) {
      console.error('failed to fetch genres from tmdb', e);
    }

    if (genres.length) {
      await this.db.insert(schema.genre).values(genres);
    }

    return genres;
  }
}
