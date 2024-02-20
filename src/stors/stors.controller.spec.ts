import { Test, TestingModule } from '@nestjs/testing';
import { StorsController } from './stors.controller';
import { StorsService } from './stors.service';

describe('StorsController', () => {
  let controller: StorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StorsController],
      providers: [StorsService],
    }).compile();

    controller = module.get<StorsController>(StorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
