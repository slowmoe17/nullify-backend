import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { StorsModule } from './stors/stors.module';
import { AuthModule } from './auth/auth.module';
import { Stor } from './stors/entities/stor.entity';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/entities/category.entity';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { VendorModule } from './vendor/vendor.module';
import { Product } from './product/entities/product.entity';
import { Cart } from './cart/entities/cart.entity';
import { ImageModule } from './image/image.module';
import { CartItemModule } from './cart-item/cart-item.module';
import { CartItem } from './cart-item/entities/cart-item.entity';
import { Image } from './image/entities/image.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: 'sql10685479',
      entities: [User, Stor, Category, Product, Cart, Image, CartItem],
      synchronize: true,
      extra: {
        charset: 'utf8mb4_general_ci',
      },
    }),
    UsersModule,
    StorsModule,
    AuthModule,
    CategoriesModule,
    ProductModule,
    CartModule,
    VendorModule,
    ImageModule,
    CartItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
