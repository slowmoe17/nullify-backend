import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { CreateStorDto } from './dto/create-stor.dto';
import { UpdateStorDto } from './dto/update-stor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Stor } from './entities/stor.entity';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class StorsService {
  constructor(
    @InjectRepository(Stor) private storReposetory: Repository<Stor>,
  ) {}
  async create(_createStorDto: any) {
    try {
      const newStor = this.storReposetory.create(_createStorDto);
      this.storReposetory.save(newStor);
      return newStor;
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }

  async findAll() {
    try {
      return await this.storReposetory.find({
        relations: {
          owner: true,
          categories: true,
        },
      });
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }

  async findOne(id: number) {
    try {
      return await this.storReposetory.findOneBy({
        id: id,
      });
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }

  async update(id: number, updateStorDto: DeepPartial<Stor>) {
    try {
      return await this.storReposetory.update(id, updateStorDto);
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }

  async remove(id: number): Promise<any> {
    try {
      return await this.storReposetory.delete(id);
    } catch (error) {
      throw new ServiceUnavailableException(error);
    }
  }
}
