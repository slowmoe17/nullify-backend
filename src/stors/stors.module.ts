import { Module } from '@nestjs/common';
import { StorsService } from './stors.service';
import { StorsController } from './stors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stor } from './entities/stor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stor])],
  controllers: [StorsController],
  providers: [StorsService],
})
export class StorsModule {}
