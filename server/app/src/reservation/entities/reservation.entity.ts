import { Account } from 'src/account/entities/account.entity';
import { Product } from 'src/product/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  BaseEntity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export const RESERVATION_STATUS = {
  canceled: 'canceled', // キャンセル
  packking: 'packking', // 出荷準備中
  shipping: 'shipping', // 配送中
  keeping: 'keeping', // 店舗保管中
  completed: 'completed', // 受取完了
} as const;

@Entity()
export class Reservation extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { comment: 'ユーザーID' })
  readonly id!: string;

  @Column({ comment: '消費者ID', type: 'uuid', name: 'consumer_id' })
  consumerId: string;

  @Column({ comment: '出品ID', type: 'uuid', name: 'product_id' })
  productId: string;

  @Column({ comment: '予約数量', type: 'int', default: 1 })
  quantity: number;

  @Column({ comment: '総額', type: 'int', default: 0, name: 'total_price' })
  totalPrice: number;

  @Column({ comment: '受取希望日時', type: 'timestamptz', name: 'desired_at' })
  desiredAt!: Date;

  @Column({ comment: '受取場所ID', type: 'uuid', name: 'receive_location_id' })
  receiveLocationId: string;

  @Column({ comment: 'ステータス', type: 'varchar', length: 10 })
  status: typeof RESERVATION_STATUS[keyof typeof RESERVATION_STATUS];

  @Column({
    comment: '配送者ID',
    type: 'uuid',
    name: 'shipper_id',
    default: null,
    nullable: true,
  })
  shipperId: string;

  @Column({
    comment: '出荷日時',
    type: 'timestamptz',
    name: 'packed_at',
    default: null,
    nullable: true,
  })
  packedAt: Date;

  @Column({
    comment: '配送日時',
    type: 'timestamptz',
    name: 'shipped_at',
    default: null,
    nullable: true,
  })
  shippedAt: Date;

  @Column({
    comment: '店舗預かり日時',
    type: 'timestamptz',
    name: 'kept_at',
    default: null,
    nullable: true,
  })
  keptAt: Date;

  @Column({
    comment: '受取日時',
    type: 'timestamptz',
    name: 'received_at',
    default: null,
    nullable: true,
  })
  receivedAt: Date;

  @CreateDateColumn({
    comment: '作成日時',
    type: 'timestamptz',
    name: 'created_at',
  })
  readonly createdAt?: Date;

  @UpdateDateColumn({
    comment: '更新日時',
    type: 'timestamptz',
    name: 'updated_at',
  })
  readonly updatedAt?: Date;

  @DeleteDateColumn({
    comment: '削除日時',
    type: 'timestamptz',
    name: 'deleted_at',
  })
  readonly deletedAt?: Date;

  @ManyToOne(() => Account, (account) => account.reservations)
  @JoinColumn({ name: 'consumer_id', referencedColumnName: 'id' })
  consumer: Account;

  @ManyToOne(() => Product, (product) => product.reservations)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: Product;

  @ManyToOne(() => Account, (account) => account.reservations)
  @JoinColumn({ name: 'receive_location_id', referencedColumnName: 'id' })
  receiveLocation: Account;

  @ManyToOne(() => Account, (account) => account.reservations)
  @JoinColumn({ name: 'shipper_id', referencedColumnName: 'id' })
  shipper: Account;

  convertTReservation(): TReservation {
    return {
      ...this,
      consumer: this.consumer,
      product: this.product,
      receiveLocation: this.receiveLocation,
      shipper: this.shipper,
    };
  }
}

export type TReservation = Pick<
  Reservation,
  | 'consumerId'
  | 'productId'
  | 'quantity'
  | 'totalPrice'
  | 'desiredAt'
  | 'receiveLocationId'
  | 'status'
  | 'shipperId'
  | 'packedAt'
  | 'shippedAt'
  | 'keptAt'
  | 'receivedAt'
  | 'createdAt'
  | 'updatedAt'
  | 'deletedAt'
> & {
  id: string;
  consumer: Account;
  product: Product;
  receiveLocation: Account;
  shipper: Account;
};
