import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/account/entities/account.entity';
import { Product } from '../product/entities/product.entity';
import { Reservation } from './entities/reservation.entity';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Reservation, Product, Account])],
  controllers: [ReservationController],
  providers: [ReservationService],
  exports: [ReservationService],
})
export class ReservationModule {}
