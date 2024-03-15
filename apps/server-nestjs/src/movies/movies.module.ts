import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { DrizzleModule } from '../drizzle/drizzle.module';
import { GenreService } from './genre/genre.service';
import { GenreController } from './genre/genre.controller';
import { MetadataApisModule } from '../metadata-apis/metadata-apis.module';
import { MediaLibraryModule } from '../media-library/media-library.module';

@Module({
  providers: [MoviesService, GenreService],
  controllers: [MoviesController, GenreController],
  imports: [DrizzleModule, MetadataApisModule, MediaLibraryModule],
})
export class MoviesModule {}
