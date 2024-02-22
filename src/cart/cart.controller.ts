import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CartService } from './cart.service';
import {
  AddCartDto,
  CreateCartDto,
  RemoveItemCartDto,
} from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Product } from 'src/product/entities/product.entity';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @Post('/addItemToCart')
  addItemToCart(
    @Body()
    addCartDto: AddCartDto,
  ) {
    return this.cartService.addItemToCart(addCartDto);
  }

  @Delete('/removeItemFromCart/:id/:itemId')
  removeItemFromCart(@Param() removeDto: RemoveItemCartDto) {
    return this.cartService.removeItemFromCart(removeDto);
  }
  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
