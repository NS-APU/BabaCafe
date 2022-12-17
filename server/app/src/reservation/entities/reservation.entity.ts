import { BaseEntityAddHashId } from 'src/common/base-entity-add-hash-id';
import { Product } from 'src/product/entities/product.entity';
import { Shop } from 'src/shop/entities/shop.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export const RESERVATION_STATUS = {
  CANCEL: 'cancel',
  UNDISPATCHED: 'undispatched',
  SHIPPING: 'shipping',
  DELIVERED: 'delivered',
  COMPLETE: 'complete',
} as const;

@Entity()
export class Reservation extends BaseEntityAddHashId {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ default: null, comment: '出荷日時' })
  shippingDate: Date;

  @Column({ default: null })
  totalPrice: number;

  @Column({ default: null, comment: '予約日時' })
  reservationDate: Date;

  @Column({ type: 'varchar', default: null })
  status: typeof RESERVATION_STATUS[keyof typeof RESERVATION_STATUS];

  @ManyToOne(() => Shop, (shop) => shop.reservations)
  shop: Shop;

  @ManyToOne(() => User, (user) => user.reservations)
  user: User;

  @OneToMany(
    () => ReservationProducts,
    (reservationProducts) => reservationProducts.reservation,
  )
  reservationProducts: ReservationProducts[];

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;

  @DeleteDateColumn()
  readonly deletedAt?: Date;

  convertTReservation() {
    return {
      ...this,
      id: this.hashId,
      user: this.user?.convertTUser(),
    };
  }
}

export type TReservation = Pick<
  Reservation,
  | 'shippingDate'
  | 'totalPrice'
  | 'status'
  | 'reservationDate'
  | 'createdAt'
  | 'updatedAt'
  | 'deletedAt'
> & {
  id: string;
  shop: Shop;
  user: User;
  reservationProducts: ReservationProducts[];
};

@Entity()
export class ReservationProducts extends BaseEntityAddHashId {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @PrimaryColumn()
  reservationId: number;

  @PrimaryColumn()
  productId: number;

  @Column({ comment: '購入する商品数' })
  quantity: number;

  @ManyToOne(
    () => Reservation,
    (reservation) => reservation.reservationProducts,
  )
  @JoinColumn({ name: 'reservationId', referencedColumnName: 'id' })
  reservation: Reservation;

  @ManyToOne(() => Product, (product) => product.reservationProducts)
  @JoinColumn({ name: 'productId', referencedColumnName: 'id' })
  product: Product;

  convertTReservationProduct(): TReservationProduct {
    return {
      ...this,
      id: this.hashId,
      product: this.product.convertTProduct(),
      reservation: this.reservation.convertTReservation(),
    };
  }
}

export type TReservationProduct = Pick<
  ReservationProducts,
  'quantity' | 'reservationId' | 'productId'
> & {
  id: string;
  reservation: Reservation;
  product: Product;
};
