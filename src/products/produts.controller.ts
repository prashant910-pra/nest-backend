// Users/Users.controller.ts
import { Controller, Get, Post,Patch, Body,Param,Query } from '@nestjs/common';
import { ProductService } from './products.service';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import {UpdateProductDto} from './dto/update-product.dto'


@Controller('products')
export class ProductsController {
  constructor(private readonly ProductService: ProductService) {}
 
  @Post()
  async create(@Body() CreateUserDto: CreateProductDto): Promise<Product> {
    return this.ProductService.create(CreateUserDto);
  }

  @Get()
  async findAll(@Query() filters: FindProductDto): Promise<Product[]> {
    return this.ProductService.findAll(filters);
  }

  @Get('search')
  async search(@Query() filters: FindProductDto): Promise<Product[]> {
    return this.ProductService.searchProducts(filters);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
  return this.ProductService.findById(id);
  }

  

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateProductDto): Promise<Product> {
    return this.ProductService.update(id, updateUserDto);
  }

 
}
