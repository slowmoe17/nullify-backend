import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateVendorDto {
  @IsString()
  vendor_plan: string;

  @IsString()
  vendor_specialties: string;
  @IsBoolean()
  is_registered: boolean;

  @IsNumber()
  user: User; 
}
