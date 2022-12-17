import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producer } from 'src/user/entities/producer.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product, PRODUCT_STATUS, TProduct } from './entities/product.entity';
import * as dayjs from 'dayjs';
import { putBase64Image } from 'src/utils/file';
import { Account } from 'src/auth/entities/account.entity';
import { USER_STATUS } from 'src/user/entities/user.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Producer)
    private producerRepository: Repository<Producer>,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async getProducts(): Promise<TProduct[]> {
    return await this.productRepository
      .find({ relations: { producer: true }, order: { id: 'ASC' } })
      .then((products) => products.map((product) => product.convertTProduct()));
  }

  async getProduct(id: number): Promise<TProduct> {
    return await this.productRepository
      .findOne({ where: { id }, relations: { producer: true } })
      .then((product) => product.convertTProduct());
  }

  async createProduct(
    dto: CreateProductDto,
    account: Account,
  ): Promise<TProduct> {
    const product = new Product();
    let producer: Producer;
    account = await this.accountRepository.findOne({
      where: { id: account.id },
      relations: { user: true },
    });
    if (account.user.mainStatus === USER_STATUS.PRODUCER) {
      producer = await this.producerRepository.findOne({
        where: { user: { id: account?.user.id } },
      });
    } else {
      // 農家以外の場合はエラーを表示。
      throw new BadRequestException();
    }
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
    if (dto.saleStartDate) {
      product.saleStartDate = dayjs(dto.saleStartDate).toDate();

      const todaysDate = dayjs().toDate();
      // 当日時が商品販売開始日時よりも前の場合は「販売予定」とする。
      // それ以外は「販売中」とする。
      if (todaysDate < product.saleStartDate) {
        product.status = PRODUCT_STATUS.WILL_SALE;
      } else {
        product.status = PRODUCT_STATUS.ON_SALE;
      }
    }

    product.producer = producer;
    await product.save();

    await this.afterSaveProduct(product, dto);
  }

  private static async afterSaveProduct(
    product: Product,
    dto: CreateProductDto,
  ) {
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
