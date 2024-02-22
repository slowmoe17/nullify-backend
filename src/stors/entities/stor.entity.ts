import { Category } from 'src/categories/entities/category.entity';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { Vendor } from 'src/vendor/entities/vendor.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
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

  @OneToOne(() => Vendor)
  @JoinColumn()
  vendor: Vendor;

  @OneToMany(() => Category, (category) => category.stor)
  categories: Category[];

  @OneToMany(() => Product, (product) => product.stor)
  products: Product[];
}
