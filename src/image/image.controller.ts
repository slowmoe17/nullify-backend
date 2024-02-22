import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/clodinary.service';

@Controller('image')
export class ImageController {
  constructor(
    private cloudinaryService: CloudinaryService,
    private readonly imageService: ImageService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createImageDto: CreateImageDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const url = await this.cloudinaryService.uploadImage(file);
    console.log(url)
    return url
    // return this.imageService.create(createImageDto);
  }

  @Get()
  findAll() {
    return this.imageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imageService.update(+id, updateImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imageService.remove(+id);
  }
}
