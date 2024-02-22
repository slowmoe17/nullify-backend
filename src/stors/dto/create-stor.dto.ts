import { IsNumber, IsString } from 'class-validator';

export class CreateStorDto {
  @IsNumber()
  owner: number;

  @IsString()
  storeName: string;

  @IsString()
  logo: string;

  @IsString()
  description: string;

  @IsString()
  storeAddress: string;
}
