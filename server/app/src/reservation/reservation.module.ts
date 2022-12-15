import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producer } from 'src/user/entities/producer.entity';
import { Staff } from 'src/user/entities/staff.entity';
import { Product } from '../product/entities/product.entity';
import {
  Reservation,
  ReservationProducts,
} from './entities/reservation.entity';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { Shop } from 'src/shop/entities/shop.entity';
import { Account } from 'src/auth/entities/account.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Producer,
      Staff,
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
export class ReservationModule {}
