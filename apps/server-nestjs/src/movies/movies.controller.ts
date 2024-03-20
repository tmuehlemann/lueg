import {
  Controller,
  Get,
  Logger,
  NotFoundException,
  Param,
  Patch,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { MoviesService } from './movies.service';
import { z } from 'zod';

@Controller('movies')
export class MoviesController {
  private logger = new Logger(MoviesController.name);
  constructor(private moviesService: MoviesService) {}

  @Get()
  async list() {
    const movies = await this.moviesService.list();
    return movies;
  }

  @Get('sync')
  private async syncWithMediaLibrary() {
    await this.moviesService.syncWithMediaLibrary();
  }

  @Get(':id')
  async getMovie(@Param('id') id: string) {
    try {
      const parsedId: number = z.coerce.number().int().positive().parse(id);
      const movie = await this.moviesService.getMovie(parsedId);
      return movie;
    } catch (e) {
      this.logger.verbose('could not find movie', e);
      throw new NotFoundException();
    }
  }

  @Patch(':id')
  async updateMovie(@Param('id') id: string, @Req() request: Request) {
    try {
      const parsedId: number = z.coerce.number().int().positive().parse(id);

      const parsedBody = z
        .object({
          title: z.string().min(1).max(255).optional(),
          releaseDate: z.string().optional(),
          tmdbId: z.number().int().positive().optional(),
          backdropPath: z.string().optional(),
          posterPath: z.string().optional(),
          overview: z.string().optional(),
          runtime: z.number().int().positive().optional(),
          genres: z.array(z.number().int().positive()).optional(),
        })
        .parse(request.body);

      const movie = await this.moviesService.updateMovie(parsedId, parsedBody);
      return movie;
    } catch (e) {
      this.logger.verbose('could not update movie', e);
      throw new NotFoundException();
    }
  }

  @Get(':id/images')
  async getMovieImages(@Param('id') id: string) {
    try {
      const parsedId: number = z.coerce.number().int().positive().parse(id);
      const movie = await this.moviesService.getMovieImages(parsedId);
      return movie;
    } catch (e) {
      this.logger.verbose('could not find movie', e);
      throw new NotFoundException();
    }
  }
}
