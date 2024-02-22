import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import {
  AddCartDto,
  CartDto,
  CreateCartDto,
  RemoveItemCartDto,
} from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { CartItem } from 'src/cart-item/entities/cart-item.entity';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
  ) {}
  create(createCartDto: CreateCartDto) {
    try {
      const newCart = this.cartRepository.create(createCartDto);
      this.cartRepository.save(newCart);
      return newCart;
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }

  async findAll() {
    try {
      return await this.cartRepository.find();
    } catch (error) {
      throw new ServiceUnavailableException(error);
    }
  }

  async getCartById(id: number): Promise<any> {
    const cart = this.cartRepository.findOne({ where: { id: id } });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return cart;
  }

  mapToCartDto(cart: any) {
    const cartDto = new CartDto();
    cartDto.id = cart.id;
    cartDto.items = cart.items.map((item) => this.mapToCartDto(item));
    cartDto.totalPrice = cart.totalPrice || 0;
    return cartDto;
  }
  async addItemToCart(addCartDto: AddCartDto): Promise<Cart> {
    const cart = await this.getCartById(addCartDto.cartId);
    const newItem = new CartItem();
    newItem.quantity = addCartDto.quantity;
    newItem.product = addCartDto.product;
    newItem.price = addCartDto.price;
    newItem.cart = cart;

    if (!cart.items) {
      cart.items = [];
    }

    cart.items.push(addCartDto);
    cart.totalPrice = this.calculateTotal(cart.items);
    return this.cartRepository.save(cart);
  }

  async removeItemFromCart(_removeDto: RemoveItemCartDto): Promise<Cart> {
    const cart = await this.getCartById(_removeDto.id);
    const itemIndex = cart.items.findIndex(
      (item) => item.id === _removeDto.itemId,
    );
    if (itemIndex === -1) {
      throw new NotFoundException('Item not found in the cart');
    }

    cart.items.splice(itemIndex, 1);

    // Calculate total after removing an item
    cart.totalPrice = this.calculateTotal(cart.items);

    await this.cartRepository.save(cart);

    return cart;
  }

  async findOne(id: number) {
    return await this.cartRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return this.cartRepository.delete(id);
  }

  // member method

  private calculateTotal(items: CartItem[]): number {
    return items.reduce((total, item) => total + item.quantity * item.price, 0);
  }
}
