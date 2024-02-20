import { Test, TestingModule } from '@nestjs/testing';
import { StorsService } from './stors.service';

describe('StorsService', () => {
  let service: StorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StorsService],
    }).compile();

    service = module.get<StorsService>(StorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
