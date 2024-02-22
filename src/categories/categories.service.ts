import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  async create(_createCategoryDto: CreateCategoryDto): Promise<Category> {
    try {
      const newCategory = new Category();
      newCategory.picture = _createCategoryDto.picture;
      newCategory.name = _createCategoryDto.name;
      // newCategory.stor = _createCategoryDto.stor;
      await this.categoryRepository.save(newCategory);
      return newCategory;
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }

  async findAll(): Promise<Category[]> {
    try {
      return await this.categoryRepository.find({
        relations: {
          stor: true,
        },
      });
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }

  async findOne(id: number): Promise<Category> {
    try {
      return await this.categoryRepository.findOneBy({ id: id });
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }

  update(id: number, updateCategoryDto: any) {
    try {
      return this.categoryRepository.update(id, updateCategoryDto);
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }

  async remove(id: number): Promise<any> {
    try {
      return await this.categoryRepository.delete(id);
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }
}
