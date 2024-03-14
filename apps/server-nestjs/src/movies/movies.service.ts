import { Inject, Injectable } from '@nestjs/common';
import { DrizzleAsyncProvider } from '../drizzle/drizzle.provider';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js/index';
import * as schema from '../drizzle/schema';

@Injectable()
export class MoviesService {
  constructor(
    @Inject(DrizzleAsyncProvider) private db: PostgresJsDatabase<typeof schema>,
  ) {}

  async list() {
    const movies = await this.db.query.movies.findMany({});

    return movies;
  }
}
