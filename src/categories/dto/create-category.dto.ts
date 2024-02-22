import { IsNumber, IsString } from 'class-validator';
import { Stor } from 'src/stors/entities/stor.entity';

export class CreateCategoryDto {
  @IsString()
  name: string;


  stor: Stor;

  picture: any;
  // stor: Stor;
}
