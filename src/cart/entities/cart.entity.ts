import { CartItem } from 'src/cart-item/entities/cart-item.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  items: CartItem[];

  @Column({ default: 0 })
  totalPrice: number;
}
