import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { Account, USER_ATTRIBUTE } from 'src/account/entities/account.entity';
import { Repository, FindOptionsWhere } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, TProduct } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async getProducts(account: Account): Promise<TProduct[]> {
    let where: FindOptionsWhere<Product> = {};
    if (account.attribute === USER_ATTRIBUTE.producer) {
      where = {
        producer: {
          id: account.id,
        },
      };
    }
    return await this.productRepository
      .find({ where, relations: { producer: true }, order: { id: 'ASC' } })
      .then((products) => products.map((product) => product.convertTProduct()));
  }

  async getProduct(id: string): Promise<TProduct> {
    return await this.productRepository
      .findOne({ where: { id }, relations: { producer: true, reservations: true } })
      .then((product) => product.convertTProduct());
  }

  async createProduct(dto: CreateProductDto, account: Account): Promise<TProduct> {
    const product = new Product();
    let producer: Account;
    account = await this.accountRepository.findOne({
      where: { id: account.id },
    });
    if (account.attribute === USER_ATTRIBUTE.producer) {
      producer = account;
    } else {
      // 生産者以外の場合はエラーを表示。
      throw new BadRequestException();
    }
    await ProductService.setProductAttributes(dto, product, producer);
    await product.save();

    return product.convertTProduct();
  }

  async updateProduct(dto: UpdateProductDto, account: Account, productId: string): Promise<TProduct> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new BadRequestException();
    }
    if (account.id !== product.producerId) {
      // 作成者以外の場合はエラーを表示。
      throw new BadRequestException();
    }

    await ProductService.setProductAttributes(dto, product, account);
    await product.save();

    return product.convertTProduct();
  }

  private static async setProductAttributes(
    dto: CreateProductDto | UpdateProductDto,
    product: Product,
    producer: Account,
  ) {
    product.producerId = producer.id;
    product.name = dto.name;
    product.kinds = dto.kinds;
    product.description = dto.description;
    if (dto.startAt) {
      product.startAt = dayjs(dto.startAt).toDate();
    }
    if (dto.endAt) {
      product.endAt = dayjs(dto.endAt).toDate();
    }
    product.unit = dto.unit;
    product.unitQuantity = dto.unitQuantity;
    product.unitPrice = dto.unitPrice;
    product.image = dto.image || null;
    product.quantity = dto.quantity;
    product.remaining = dto.quantity;
    product.shockLevel = dto.shockLevel;
  }

  async deleteProduct(account: Account, productId: string): Promise<TProduct> {
    const product = await this.productRepository.findOne({ where: { id: productId } });

    if (!product || account.id !== product.producerId) {
      throw new BadRequestException();
    }

    await this.productRepository.softRemove(product);

    return product.convertTProduct();
  }
}
