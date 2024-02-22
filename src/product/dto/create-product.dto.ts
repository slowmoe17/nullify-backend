import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Category } from 'src/categories/entities/category.entity';

export class CreateProductDto {
  @IsNumber()
  category: Category;

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
