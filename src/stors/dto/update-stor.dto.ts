import { PartialType } from '@nestjs/mapped-types';
import { CreateStorDto } from './create-stor.dto';

export class UpdateStorDto extends PartialType(CreateStorDto) {}
