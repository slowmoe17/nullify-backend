import { Module } from '@nestjs/common';
import { StorsService } from './stors.service';
import { StorsController } from './stors.controller';

@Module({
  controllers: [StorsController],
  providers: [StorsService],
})
export class StorsModule {}
