import { IsNumber } from "class-validator";
import { CartItem } from "src/cart-item/entities/cart-item.entity";
import { Product } from "src/product/entities/product.entity";
import { User } from 'src/users/entities/user.entity';

export class CreateCartDto {
  @IsNumber()
  user: User;
}

export class CartDto {
  id: number;
  items: CartItem[];
  totalPrice: number;
}
export class RemoveItemCartDto {

  id: number;

  itemId:number;
}

export class AddCartDto {
    @IsNumber()
    cartId: number;

     @IsNumber()
    quantity: number;

    @IsNumber()
    price: number;

    @IsNumber()
    product: Product;
}
