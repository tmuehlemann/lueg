import { Test, TestingModule } from '@nestjs/testing';
import { MediaFilesController } from './media-files.controller';

describe('MediaFilesController', () => {
  let controller: MediaFilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MediaFilesController],
    }).compile();

    controller = module.get<MediaFilesController>(MediaFilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
