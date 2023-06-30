import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { Account, USER_ATTRIBUTE } from 'src/account/entities/account.entity';
import { Product } from 'src/product/entities/product.entity';
import { DataSource, EntityManager, FindOptionsWhere, Repository } from 'typeorm';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationForPackedDto } from './dto/update-reservation-for-packed.dto';
import { Reservation, RESERVATION_STATUS, TReservation } from './entities/reservation.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  async getReservations(account: Account): Promise<TReservation[]> {
    let where: FindOptionsWhere<Reservation> = {};

    if (account.attribute === USER_ATTRIBUTE.producer) {
      where = {
        ...where,
        product: {
          producer: {
            id: account.id,
          },
        },
      };
    } else if (account.attribute === USER_ATTRIBUTE.consumer) {
      where = {
        ...where,
        consumerId: account.id,
      };
    } else if (account.attribute === USER_ATTRIBUTE.logistics) {
      where = {
        ...where,
        shipperId: account.id,
      };
    } else if (account.attribute === USER_ATTRIBUTE.intermediary) {
      where = {
        ...where,
        receiveLocationId: account.id,
      };
    }

    return await this.reservationRepository
      .find({
        where,
        relations: ['consumer', 'product', 'product.producer', 'shipper', 'receiveLocation'],
        order: { createdAt: 'DESC' },
      })
      .then((reservation) => reservation?.map((reservation) => reservation.convertTReservation()));
  }

  async getReservation(id: string): Promise<TReservation> {
    return await this.reservationRepository
      .findOne({
        where: { id },
        relations: ['consumer', 'product', 'product.producer', 'shipper', 'receiveLocation'],
      })
      .then((reservation) => reservation.convertTReservation());
  }

  async createReservation(dto: CreateReservationDto, account: Account): Promise<TReservation> {
    const reservation = new Reservation();
    const product = await this.productRepository.findOne({
      where: { id: dto.productId },
    });
    this.setReservationAttributes(dto, reservation, product, account);

    await this.dataSource.manager.transaction(async (manager: EntityManager) => {
      product.remaining -= dto.quantity;
      await manager.save(product);
      await manager.save(reservation);
    });

    return reservation.convertTReservation();
  }

  private async setReservationAttributes(
    dto: CreateReservationDto,
    reservation: Reservation,
    product: Product,
    account: Account,
  ) {
    reservation.consumerId = account.id;
    reservation.productId = dto.productId;
    reservation.quantity = dto.quantity;
    reservation.totalPrice = dto.quantity * product.unitPrice;
    reservation.desiredAt = dayjs(dto.desiredAt).toDate();
    reservation.receiveLocationId = dto.receiveLocationId;
    reservation.status = RESERVATION_STATUS.packking;
  }

  async updateReservationForPacked(
    account: Account,
    reservationId: string,
    dto: UpdateReservationForPackedDto,
  ): Promise<TReservation> {
    const reservation = await this.reservationRepository
      .findOne({
        where: { id: reservationId },
        relations: ['product'],
      })
      .then((reservation) => reservation.convertTReservation());

    if (!reservation) {
      throw new BadRequestException();
    }
    if (account.id !== reservation.product.producerId) {
      throw new BadRequestException();
    }
    if (reservation.status !== RESERVATION_STATUS.packking) {
      throw new BadRequestException();
    }

    reservation.status = RESERVATION_STATUS.shipping;
    reservation.shipperId = dto.shipperId;
    reservation.packedAt = new Date();
    this.reservationRepository.save(reservation);
    return reservation;
  }

  async updateReservationForKept(account: Account, reservationId: string): Promise<TReservation> {
    const reservation = await this.reservationRepository
      .findOne({ where: { id: reservationId } })
      .then((reservation) => reservation.convertTReservation());

    if (!reservation) {
      throw new BadRequestException();
    }
    if (account.id !== reservation.receiveLocationId) {
      throw new BadRequestException();
    }
    if (reservation.status !== RESERVATION_STATUS.shipping) {
      throw new BadRequestException();
    }

    reservation.status = RESERVATION_STATUS.keeping;
    reservation.shippedAt = new Date();
    reservation.keptAt = new Date();
    this.reservationRepository.save(reservation);
    return reservation;
  }

  async updateReservationForReceived(account: Account, reservationId: string): Promise<TReservation> {
    const reservation = await this.reservationRepository
      .findOne({ where: { id: reservationId } })
      .then((reservation) => reservation.convertTReservation());

    if (!reservation) {
      throw new BadRequestException();
    }
    if (account.id !== reservation.consumerId) {
      throw new BadRequestException();
    }
    if (reservation.status !== RESERVATION_STATUS.keeping) {
      throw new BadRequestException();
    }

    reservation.status = RESERVATION_STATUS.completed;
    reservation.receivedAt = new Date();
    this.reservationRepository.save(reservation);
    return reservation;
  }
}
