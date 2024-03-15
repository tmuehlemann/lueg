import { Module } from '@nestjs/common';
import { MetadataAssetsService } from './metadata-assets.service';
import sharp from 'sharp';
import { join } from 'path';
import * as process from 'process';

@Module({
  providers: [MetadataAssetsService],
  exports: [MetadataAssetsService],
})
export class MetadataAssetsModule {}
