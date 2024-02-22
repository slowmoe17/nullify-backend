import { Cart } from 'src/cart/entities/cart.entity';
import { Product } from 'src/product/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @OneToOne(() => Product, { eager: true })
  @JoinColumn()
  product: Product;


  @ManyToOne(() => Cart, (cart) => cart.items)
  @JoinColumn({ name: 'cartId' })
  cart: Cart;

}
