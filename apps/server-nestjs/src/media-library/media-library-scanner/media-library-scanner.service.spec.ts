import { Test, TestingModule } from '@nestjs/testing';
import { MediaLibraryScannerService } from './media-library-scanner.service';

describe('MediaLibraryScannerService', () => {
  let service: MediaLibraryScannerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MediaLibraryScannerService],
    }).compile();

    service = module.get<MediaLibraryScannerService>(MediaLibraryScannerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
