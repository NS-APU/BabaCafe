import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shop, TShop } from './entities/shop.entity';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop)
    private shopRepository: Repository<Shop>,
  ) {}

  async getShops(): Promise<TShop[]> {
    return await this.shopRepository
      .find({ relations: { reservations: true } })
      .then((shops) => shops.map((shop) => shop.convertTShop()));
  }
}
