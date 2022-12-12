import { Controller, Get, Param } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { ProductService } from './entities/product.service';
import { ProductValidationPipe } from './pipes/product-validation.pipe';

@Controller('product')
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
}
