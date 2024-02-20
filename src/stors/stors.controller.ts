import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StorsService } from './stors.service';
import { CreateStorDto } from './dto/create-stor.dto';
import { UpdateStorDto } from './dto/update-stor.dto';

@Controller('stors')
export class StorsController {
  constructor(private readonly storsService: StorsService) {}

  @Post()
  create(@Body() createStorDto: CreateStorDto) {
    return this.storsService.create(createStorDto);
  }

  @Get()
  findAll() {
    return this.storsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStorDto: UpdateStorDto) {
    return this.storsService.update(+id, updateStorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storsService.remove(+id);
  }
}
