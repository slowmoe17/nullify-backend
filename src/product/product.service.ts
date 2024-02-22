import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository, getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository ,getRepository } from 'typeorm';
import { Image } from 'src/image/entities/image.entity';
import { CloudinaryService } from 'src/cloudinary/clodinary.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Image)
    private iamgeRepository: Repository<Image>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  async create(
    createProductDto: CreateProductDto,
    images: any,
  ): Promise<CreateProductDto> {
    try {
      const newProduct = this.productRepository.create(createProductDto);
      images.map(async (image) => {
        const { secure_url } = await this.cloudinaryService.uploadImage(image);
        const img = new Image();
        img.product = newProduct;
        img.url = secure_url;
        this.iamgeRepository.save(img);
      });
      return await this.productRepository.save(newProduct);
    } catch (error) {
      throw new ServiceUnavailableException(
        'An error occurred while processing the request.' + error,
      );
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      return await this.productRepository.find({
        relations: {
          category: true,
        },
      });
    } catch (error) {
      throw new ServiceUnavailableException(
        'An error occurred while processing the request.',
      );
    }
  }

  async findOne(id: number): Promise<Product> {
    try {
      return await this.productRepository
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.images', 'Image')
        .where('product.id = :id', { id })
      .getOne();
    } catch (error) {
      throw new ServiceUnavailableException(
        'An error occurred while processing the request.',
      );
    }
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    try {
      return this.productRepository.update(id, updateProductDto);
    } catch (error) {
      throw new ServiceUnavailableException(
        'An error occurred while processing the request.',
      );
    }
  }

  async remove(id: number) {
    try {
      return await this.productRepository.delete(id);
    } catch (error) {
      throw new ServiceUnavailableException(
        'An error occurred while processing the request.',
      );
    }
  }
}
