import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { DrizzleModule } from '../drizzle/drizzle.module';

@Module({
  providers: [MoviesService],
  controllers: [MoviesController],
  imports: [DrizzleModule],
})
export class MoviesModule {}
