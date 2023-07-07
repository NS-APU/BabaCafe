import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/account/entities/account.entity';
import { Product } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Account])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
