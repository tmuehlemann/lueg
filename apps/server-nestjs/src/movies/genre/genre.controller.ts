import { Controller, Get } from '@nestjs/common';
import { GenreService } from './genre.service';
import { Public } from '../../auth/constants';

@Controller('movies/genres')
export class GenreController {
  constructor(private genreService: GenreService) {}

  @Public()
  @Get('sync')
  async sync() {
    const genres = await this.genreService.sync();

    return genres;
  }
}
