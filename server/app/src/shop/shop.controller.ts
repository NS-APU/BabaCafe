import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/account/jwt-auth.guard';
import { TShop } from './entities/shop.entity';
import { ShopService } from './shop.service';

@Controller('shops')
@UseGuards(JwtAuthGuard)
export class ShopController {
  constructor(private shopService: ShopService) { }

  @Get()
  async getShops(): Promise<TShop[]> {
    return this.shopService.getShops();
  }
}
