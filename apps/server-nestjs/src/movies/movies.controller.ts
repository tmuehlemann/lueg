import {
  Controller,
  Get,
  Inject,
  Logger,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Public } from '../auth/constants';
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
}
