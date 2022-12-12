import { PipeTransform } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { GetKeyValidationPipe } from 'src/common/get-key-validation.pipe';
import { DataSource } from 'typeorm';
import { Product } from '../entities/product.entity';

export class ProductValidationPipe implements PipeTransform {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}
  async transform(hashId: string): Promise<Product> {
    return await new GetKeyValidationPipe(this.dataSource).target({
      entity: new Product(),
      value: hashId,
    });
  }
}
