//#region
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import slugify from 'slugify';
import { Category } from 'src/categories/entities/category.entity';
import { Stor } from 'src/stors/entities/stor.entity';
import 'reflect-metadata';
import { Image } from 'src/image/entities/image.entity';
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  Price: number;

  @Column()
  quantity: number;

  @Column()
  has_discount: boolean;

  @Column({ nullable: true })
  price_after_discount: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;

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

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ManyToOne(() => Stor, (stor) => stor.products)
  stor: Stor;

  @OneToMany(() => Image, (image) => image.product, { cascade: true })
  @JoinColumn()
  images: Image[];
}
//#endregion
