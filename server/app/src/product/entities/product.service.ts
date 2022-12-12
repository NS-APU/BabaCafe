import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producer } from 'src/user/entities/producer.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { Product, PRODUCT_STATUS, TProduct } from './product.entity';
import dayjs from 'dayjs';
import { putBase64Image } from 'src/utils/file';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async getProducts(): Promise<TProduct[]> {
    return await this.productRepository
      .find()
      .then((products) => products.map((product) => product.convertTProduct()));
  }

  async getProduct(id: number): Promise<TProduct> {
    return await this.productRepository
      .findOne({ where: { id } })
      .then((product) => product.convertTProduct());
  }

  async createProduct(
    dto: CreateProductDto,
    producer: Producer,
  ): Promise<TProduct> {
    const product = new Product();
    await ProductService.setProductAttributes(dto, product, producer);
    await product.save();

    return product.convertTProduct();
  }

  private static async setProductAttributes(
    dto: CreateProductDto,
    product: Product,
    producer: Producer,
  ) {
    product.name = dto.name;
    product.description = dto.description;
    product.price = dto.price;
    product.unitWeight = dto.unitWeight;
    product.totalAmount = dto.totalAmount;
    product.saleStartDate = dayjs(dto.saleStartDate).toDate();

    const todaysDate = dayjs().toDate();
    // 当日時が商品販売開始日時よりも前の場合は「販売予定」とする。
    // それ以外は「販売中」とする。
    if (todaysDate < product.saleStartDate) {
      product.status = PRODUCT_STATUS.WILL_SALE;
    } else {
      product.status = PRODUCT_STATUS.ON_SALE;
    }
    product.producer = producer;

    // imageの値がbase64である(httpから始まらない)なら，ストレージに保存する処理を行う
    if (dto.image && !dto.image.startsWith('http')) {
      product.image = await putBase64Image(
        `product/${product.hashId}`,
        dto.image,
      );
      await product.save();
    }
  }
}
