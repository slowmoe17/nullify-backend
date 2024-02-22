import { IsNumber, IsString } from 'class-validator';
import { Vendor } from 'src/vendor/entities/vendor.entity';

export class CreateStorDto {
  @IsNumber()
  owner: Vendor;

  @IsString()
  storeName: string;

  @IsString()
  logo: string;

  @IsString()
  description: string;

  @IsString()
  storeAddress: string;
}
