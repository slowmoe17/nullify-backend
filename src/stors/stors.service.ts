import { Injectable } from '@nestjs/common';
import { CreateStorDto } from './dto/create-stor.dto';
import { UpdateStorDto } from './dto/update-stor.dto';

@Injectable()
export class StorsService {
  create(createStorDto: CreateStorDto) {
    return 'This action adds a new stor';
  }

  findAll() {
    return `This action returns all stors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stor`;
  }

  update(id: number, updateStorDto: UpdateStorDto) {
    return `This action updates a #${id} stor`;
  }

  remove(id: number) {
    return `This action removes a #${id} stor`;
  }
}
