import { Controller, Get, Inject } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Public } from '../auth/constants';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get()
  async list() {
    const movies = await this.moviesService.list();
    return movies;
  }

  @Public()
  @Get('sync')
  private async syncWithMediaLibrary() {
    await this.moviesService.syncWithMediaLibrary();
  }
}
