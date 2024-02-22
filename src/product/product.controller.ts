import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Response } from 'express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @Res() res: Response,
  ) {
   try {
      const result = await this.productService.create(createProductDto);
      res.status(200).send({
        products: result,
      });
   } catch (error) {
    res.status(500).send({
      message: 'server error',
    });
   }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const produucts = await this.productService.findAll();
      res.status(200).send({
        produucts: produucts,
      });
    } catch (error) {
      res.status(500).send({
        message: 'server error',
      });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const product = await this.productService.findOne(+id);
      if (!product) {
        res.status(404).send(`not found product with id ${id}`);
      } else {
        res.status(200).send({ product: product });
      }
    } catch (error) {
      res.status(500).send('server error happned');
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @Res() res: Response,
  ) {
    try {
      const updatePoduct = await this.productService.update(
        +id,
        updateProductDto,
      );
      if (!updatePoduct.affected) {
        res.status(404).send(`not found product with id ${id}`);
      } else {
        res.status(200).send('product upadted successfully');
      }
    } catch (error) {
      res.status(500).send('server error happned');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.productService.remove(+id);
      if (!result.affected) {
        res.status(404).send(`not found product with id+${id}`);
      } else {
        res.status(200).send('product deleted succesfully');
      }
    } catch (error) {
      res.status(500).send('Internal server error');
    }
  }
}
