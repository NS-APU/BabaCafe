import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Account } from 'src/account/entities/account.entity';
import { GetAccount } from 'src/account/get-account.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { JwtAuthGuard } from 'src/account/jwt-auth.guard';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get()
  async getProducts() {
    return this.productService.getProducts();
  }

  @Get('/:productId')
  async getProduct(
    @Param('productId') productId: string,
  ) {
    return this.productService.getProduct(productId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createProduct(
    @Body() createProductDto: CreateProductDto,
    @GetAccount() account: Account,
  ) {
    return this.productService.createProduct(createProductDto, account);
  }
}
