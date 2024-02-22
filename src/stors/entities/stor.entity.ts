import { Category } from 'src/categories/entities/category.entity';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Stor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  storeName: string;

  @Column()
  logo: string;

  @Column()
  description: string;

  @Column()
  storeAddress: string;

  @OneToOne(() => User)
  @JoinColumn()
  owner: User;

  @ManyToMany(() => Category, (category) => category.stors)
  @JoinTable()
  categories: Category[];

  @ManyToMany(() => Product, (product) => product.stors)
  @JoinTable()
  products: Product[];
}
