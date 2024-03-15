import { Module } from '@nestjs/common';
import { MediaLibraryScannerService } from './media-library-scanner/media-library-scanner.service';
import { MediaFilesService } from './media-files/media-files.service';
import { DrizzleModule } from '../drizzle/drizzle.module';

@Module({
  providers: [MediaLibraryScannerService, MediaFilesService],
  exports: [MediaLibraryScannerService, MediaFilesService],
  imports: [DrizzleModule],
})
export class MediaLibraryModule {}
