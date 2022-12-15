import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetAccount } from 'src/auth/get-account.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateReservationDto } from './dto/create-reservation.dto';
import {
  ReservationProducts,
  TReservation,
  TReservationProduct,
} from './entities/reservation.entity';
import { ReservationProductValidationPipe } from './pipes/reservation-product-validation.pipe';
import { ReservationService } from './reservation.service';

@Controller('reservations')
@UseGuards(JwtAuthGuard)
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get('/products')
  async getReservationProducts(
    @GetAccount() account: Record<string, string>,
  ): Promise<TReservationProduct[]> {
    return this.reservationService.getReservationProducts(account.accountId);
  }

  @Get('/products/:reservationProductId')
  async getReservationProduct(
    @Param('reservationProductId', ReservationProductValidationPipe)
    reservationProduct: ReservationProducts,
  ): Promise<TReservationProduct> {
    return this.reservationService.getReservationProduct(reservationProduct.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createReservation(
    @Body() createReservationDto: CreateReservationDto,
    @GetAccount() account: Record<string, string>,
  ): Promise<TReservation> {
    return this.reservationService.createReservation(
      createReservationDto,
      account.accountId,
    );
  }
}
