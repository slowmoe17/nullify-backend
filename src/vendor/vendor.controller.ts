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
import { VendorService } from './vendor.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { Response } from 'express';

@Controller('vendor')
export class VendorController {
  constructor(private readonly vendorService: VendorService) { }

  @Post()
  create(@Body() createVendorDto: CreateVendorDto) {
    return this.vendorService.create(createVendorDto);
  }

  @Get()
  findAll() {
    return this.vendorService.findAll();
  }

  @Get(':id')
 async findOne(@Param('id') id: string, @Res() res: Response) {
    const vendor = await this.vendorService.findOne(+id);
    if (!vendor) {
      res.status(404).send(`not found vendor with id ${id}`);
    } else {
      res.status(200).send({
        vendor: vendor,
      });
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateVendorDto: UpdateVendorDto,
    @Res() res: Response 
  ) {
    const result = await this.vendorService.update(+id, updateVendorDto);
    if (!result.affected) {
      res.status(404).send(`not found vendor with id+${id}`);
    } else {
      res.status(200).send('vendor update succesfully');

    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {

    const result = await this.vendorService.remove(+id);
    if (!result.affected) {
      res.status(404).send(`not found stor with id+${id}`);
    } else {
      res.status(200).send('stor deleted succesfully');

    }
  }
}
