import { Test, TestingModule } from '@nestjs/testing';
import { MetadataAssetsService } from './metadata-assets.service';

describe('MetadataAssetsService', () => {
  let service: MetadataAssetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetadataAssetsService],
    }).compile();

    service = module.get<MetadataAssetsService>(MetadataAssetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
