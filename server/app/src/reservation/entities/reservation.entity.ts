import { Product } from 'src/product/entities/product.entity';
import { Shop } from 'src/shop/entities/shop.entity';
import { User } from 'src/user/entities/user.entity';
import {
  BaseEntity,
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

const RESERVATION_STATUS = {
  ACCEPTING: 'accepting',
  CANCEL: 'cancel',
  SHIPPING: 'shipping',
  ON_SALE: 'onSale',
  COMPLETE: 'complete',
} as const;

@Entity()
export class Reservation extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ default: null })
  hashId: string;

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
}

@Entity()
export class ReservationProducts extends BaseEntity {
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
}
