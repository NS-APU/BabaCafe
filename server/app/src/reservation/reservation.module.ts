import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../product/entities/product.entity';
import {
  Reservation,
  ReservationProducts,
} from './entities/reservation.entity';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { Shop } from 'src/shop/entities/shop.entity';
import { Account } from 'src/account/entities/account.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Reservation,
      Product,
      ReservationProducts,
      Shop,
      Account,
    ]),
  ],
  controllers: [ReservationController],
  providers: [ReservationService],
  exports: [ReservationService],
})
export class ReservationModule { }
