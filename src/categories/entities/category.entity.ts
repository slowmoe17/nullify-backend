import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import slugify from 'slugify';
import { Stor } from 'src/stors/entities/stor.entity';
import { Product } from 'src/product/entities/product.entity';
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  picture: string;

  @Column()
  slug: string;

  @BeforeInsert()
  generateSlug() {
    this.slug = slugify(this.name, {
      replacement: '-',
      remove: undefined,
      lower: true,
      strict: true,
      locale: 'en',
    });
  }

  @ManyToMany(() => Stor, (stor) => stor.categories)
  @JoinTable()
  stors: Stor[];

  @OneToMany(() => Product, (product) => product.category)
  @JoinTable()
  products: Product[];
}
