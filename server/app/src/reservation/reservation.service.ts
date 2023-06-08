import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { Account } from 'src/account/entities/account.entity';
import { Product } from 'src/product/entities/product.entity';
import { Shop } from 'src/shop/entities/shop.entity';
import {
  DataSource,
  EntityManager,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { CreateReservationDto } from './dto/create-reservation.dto';
import {
  Reservation,
  ReservationProducts,
  RESERVATION_STATUS,
  TReservation,
  TReservationProduct,
} from './entities/reservation.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ReservationProducts)
    private reservationProductRepository: Repository<ReservationProducts>,
    @InjectRepository(Shop)
    private shopRepository: Repository<Shop>,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    @InjectDataSource() private dataSource: DataSource,
  ) { }

  async getReservationProducts(
    id: string,
  ): Promise<TReservationProduct[]> {
    let where: FindOptionsWhere<ReservationProducts> = {};
    const account = await this.accountRepository.findOne({
      where: { id }
    });

    if (account.attribute === 'producer') {
      where = {
        ...where,
        product: {
          producer: {
            id: account.id,
          },
        },
      };
    } else if (account.attribute === 'consumer') {
      where = {
        ...where,
        reservation: {
          user: {
            id: account.id,
          },
        },
      };
    }

    return await this.reservationProductRepository
      .find({
        where,
        relations: { reservation: { shop: true, user: true }, product: true },
        order: { id: 'DESC' },
      })
      .then((reservationProducts) =>
        reservationProducts?.map((reservationProduct) =>
          reservationProduct.convertTReservationProduct(),
        ),
      );
  }

  async getReservationProduct(id: number): Promise<TReservationProduct> {
    return await this.reservationProductRepository
      .findOne({
        where: { id },
        relations: { reservation: { shop: true }, product: true },
      })
      .then((reservationProduct) =>
        reservationProduct.convertTReservationProduct(),
      );
  }

  async createReservation(
    dto: CreateReservationDto,
    id: string,
  ): Promise<TReservation> {
    const account = await this.accountRepository.findOne({
      where: { id },
    });

    const reservation = new Reservation();
    const shop = await this.shopRepository.findOne({
      where: { hashId: dto.shopId },
    });
    this.setReservationAttributes(dto, reservation, shop, account);

    await this.dataSource.manager.transaction(async (manager) => {
      // save時にPrimaryGeneratedKeyが発行されるため、一旦save
      await manager.save(reservation);

      await this.saveReservationProducts(dto, reservation, manager);

      await manager.save(reservation);
    });

    return reservation.convertTReservation();
  }

  private async setReservationAttributes(
    dto: CreateReservationDto,
    reservation: Reservation,
    shop: Shop,
    user: Account,
  ) {
    reservation.shippingDate = dayjs(dto.shippingDate).toDate();
    reservation.reservationDate = dayjs(dto.reservationDate).toDate();
    reservation.status = RESERVATION_STATUS.UNDISPATCHED;
    reservation.totalPrice = dto.totalPrice;
    reservation.shop = shop;
    reservation.user = user;
  }

  private async saveReservationProducts(
    dto: CreateReservationDto,
    reservation: Reservation,
    txManager: EntityManager,
  ) {
    await Promise.all(
      dto.products.map(async (dtoProduct) => {
        const product = await this.productRepository.findOne({
          where: { hashId: dtoProduct.productId },
        });
        product.totalAmount -= dtoProduct.quantity;
        await txManager.save(product);

        const reservationProducts = new ReservationProducts();

        reservationProducts.product = product;
        reservationProducts.productId = product.id;
        reservationProducts.reservation = reservation;
        reservationProducts.reservationId = reservation.id;
        reservationProducts.quantity = dtoProduct.quantity;

        await txManager.save(reservationProducts);
      }),
    );
  }
}
