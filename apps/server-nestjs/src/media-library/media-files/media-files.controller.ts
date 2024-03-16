import {
  Controller,
  Get,
  Logger,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { MediaFilesService } from './media-files.service';
import { z } from 'zod';

@Controller('media-files')
export class MediaFilesController {
  constructor(private mediaFilesService: MediaFilesService) {}

  @Get(':id')
  async getMediaFile(@Param('id') id: string) {
    try {
      const parsedId = z.coerce.number().parse(id);
      return await this.mediaFilesService.getMediaFile(parsedId);
    } catch (e) {
      Logger.log('trying to access movie route with malformed id in path', e);
      throw new NotFoundException('file not found');
    }
  }
}
