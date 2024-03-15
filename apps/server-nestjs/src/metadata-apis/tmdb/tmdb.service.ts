import { Injectable, Logger } from '@nestjs/common';
import {
  genreListSchema,
  movieSchema,
  querySchema,
  TmdbGenre,
  TmdbMovie,
  TmdbQuery,
} from './tmdb.schema';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TmdbService {
  private readonly baseUrl: string = 'https://api.themoviedb.org/3';

  private readonly logger = new Logger(TmdbService.name);

  constructor(private configService: ConfigService) {}

  async getMovieGenres(): Promise<TmdbGenre[]> {
    const response = await this.fetch(`/genre/movie/list`);

    return genreListSchema.parse(response).genres;
  }

  async getMovieDetails(id: number): Promise<TmdbMovie> {
    const response = await this.fetch(`/movie/${id}`);

    return movieSchema.parse(response);
  }

  async queryMovie(query: string, year?: number): Promise<TmdbQuery> {
    const response = await this.fetch(
      `/search/movie?query=${query}${year ? `&year=${year}` : ''}`,
    );

    return querySchema.parse(response);
  }

  // todo: fetches could be generalized across projects (client & server apps)
  private async fetch(path: string, settings: RequestInit = {}) {
    const completeSettings: RequestInit = {
      ...settings,
      headers: {
        ...settings?.headers,
        Authorization: `Bearer ${this.configService.get<string>('TMDB_API_KEY')}`,
        Accept: 'application/json',
      },
    };

    const url = this.baseUrl + path;

    this.logger.log(`fetching "${url}"`);

    const result = await fetch(url, completeSettings);
    if (!result.ok) return;

    return await result.json();
  }
}
