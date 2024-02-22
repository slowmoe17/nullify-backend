import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from './entities/vendor.entity';

@Injectable()
export class VendorService {
  constructor(
    @InjectRepository(Vendor) private vendorRepository: Repository<Vendor>,
  ) {}
  create(createVendorDto: CreateVendorDto) {
    try {
      const newVendor = this.vendorRepository.create(createVendorDto);
      this.vendorRepository.save(newVendor);
      return newVendor;
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }

  async findAll() {
    try {
      return await this.vendorRepository.find({
        relations: {
          user: true,
        },
      });
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }

  async findOne(id: number) {
    try {
      return await this.vendorRepository
        .createQueryBuilder('vendor')
        .innerJoinAndSelect('vendor.user', 'user')
        .where('vendor.id= :id', { id })
        .getOne();
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }

  async update(id: number, updateVendorDto: UpdateVendorDto) {
    try {
      return await this.vendorRepository.update(id, updateVendorDto);
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }

  async remove(id: number) {
    try {
      return await this.vendorRepository.delete(id);
    } catch (error) {
      throw new ServiceUnavailableException(error);
    }
  }
}
