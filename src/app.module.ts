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
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CloudinaryService } from './cloudinary/clodinary.service';
import { Vendor } from './vendor/entities/vendor.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOSTV2,
      port: Number(process.env.DATABASE_PORTV2),
      username: process.env.DATABASE_USERV2,
      password: process.env.DATABASE_PASSWORDV2,
      database: 'defaultdb',
      entities: [User, Stor, Category, Product, Cart, Image, CartItem, Vendor],
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
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService, CloudinaryService],
})
export class AppModule {}
