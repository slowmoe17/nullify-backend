import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
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

  @ManyToOne(() => Stor, (stor) => stor.categories)
  stor: Stor;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
