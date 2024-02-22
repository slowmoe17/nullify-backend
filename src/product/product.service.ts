import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto): Promise<CreateProductDto> {
    try {
      const newProduct = this.productRepository.create(createProductDto);
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
      return this.productRepository.findOneBy({ id: id });
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
