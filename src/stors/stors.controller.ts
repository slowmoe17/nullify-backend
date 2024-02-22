import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { StorsService } from './stors.service';
import { CreateStorDto } from './dto/create-stor.dto';
import { UpdateStorDto } from './dto/update-stor.dto';
import { DeepPartial } from 'typeorm';
import { Stor } from './entities/stor.entity';
import { Response } from 'express';

@Controller('stors')
export class StorsController {
  constructor(private readonly storsService: StorsService) {}

  @Post()
  create(@Body() createStorDto: DeepPartial<Stor>) {
    return this.storsService.create(createStorDto);
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const stors = await this.storsService.findAll();
      res.status(200).send({
        stors: stors,
      });
    } catch (error) {
      res.status(500).send({
        message: 'server error',
      });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const stor = await this.storsService.findOne(+id);
      if (!stor) {
        res.status(404).send(`not found stor with id ${id}`);
      } else {
        res.status(200).send({
          stor: stor,
        });
      }
    } catch (error) {
      res.status(500).send('server error happned');
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStorDto: DeepPartial<Stor>,
    @Res() res: Response,
  ) {
    try {
      const updatestor = await this.storsService.update(+id, updateStorDto);
      if (!updatestor.affected) {
        res.status(404).send(`not found stor with id ${id}`);
      } else {
        res.status(200).send('stor upadted successfully');
      }
    } catch (error) {
      res.status(500).send('server error happned');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.storsService.remove(+id);

      if (!result.affected) {

        res.status(404).send(`not found stor with id+${id}`);
        
      } else {

        res.status(200).send('stor deleted succesfully');

      }
    } catch (error) {
      res.status(500).send('Internal server error');
    }
  }
}
