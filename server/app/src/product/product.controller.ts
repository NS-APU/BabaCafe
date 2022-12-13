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
import { Account } from 'src/auth/entities/account.entity';
import { GetAccount } from 'src/auth/get-account.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { ProductValidationPipe } from './pipes/product-validation.pipe';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts() {
    return this.productService.getProducts();
  }

  @Get('/:productId')
  async getProduct(
    @Param('productId', ProductValidationPipe) product: Product,
  ) {
    return this.productService.getProduct(product.id);
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
