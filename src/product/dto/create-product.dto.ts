import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Category } from 'src/categories/entities/category.entity';
import { Stor } from 'src/stors/entities/stor.entity';

export class CreateProductDto {
  @IsNumber()
  category: Category;

  @IsNumber()
  stor: Stor

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  Price: number;

  @IsNumber()
  quantity: number;

  @IsBoolean()
  has_discount: boolean;

  @IsNumber()
  price_after_discount: number;
}
