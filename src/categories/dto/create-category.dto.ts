import { IsNumber, IsString } from 'class-validator';
import { Stor } from 'src/stors/entities/stor.entity';

export class CreateCategoryDto {
  @IsString()
  name: string;
   
  // @IsNumber()
  // stor: Stor;

  picture: any;


}
