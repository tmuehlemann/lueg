import { Module } from '@nestjs/common';
import { MediaLibraryScannerService } from './media-library-scanner/media-library-scanner.service';
import { MediaFilesService } from './media-files/media-files.service';
import { DrizzleModule } from '../drizzle/drizzle.module';
import { MediaFilesController } from './media-files/media-files.controller';

@Module({
  providers: [MediaLibraryScannerService, MediaFilesService],
  exports: [MediaLibraryScannerService, MediaFilesService],
  imports: [DrizzleModule],
  controllers: [MediaFilesController],
})
export class MediaLibraryModule {}
