import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { CloudinaryProvider } from 'src/cloudinary/cloudinary';
import { CloudinaryService } from 'src/cloudinary/clodinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  controllers: [ImageController],
  providers: [ImageService, CloudinaryService],
})
export class ImageModule {}
