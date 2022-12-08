import { ReservationProducts } from 'src/reservation/entities/reservation.entity';
import { Producer } from 'src/user/entities/producer.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Review } from './review.entity';

const PRODUCT_STATUS = {
  ON_SALE: 'onSale', // 販売中
  SOLD_OUT: 'soldOut', // 売り切れ
  WILL_SALE: 'willSale', // 販売予定
  SALE_OUT: 'saleOut', // 販売終了
};

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ default: null })
  hashId: string;

  @Column({ default: null })
  name: string;

  @Column({ default: null })
  description: string;

  @Column({ default: null })
  image: string;

  @Column({ default: null })
  saleStartDate: Date;

  @Column({ type: 'varchar', default: null })
  status: typeof PRODUCT_STATUS[keyof typeof PRODUCT_STATUS];

  @Column({ default: null })
  price: number;

  @Column({ default: null, comment: '商品単位の重量（g）' })
  unitWeight: number;

  @Column({ default: null })
  totalAmount: number;

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;

  @DeleteDateColumn()
  readonly deletedAt?: Date;

  @OneToMany(
    () => ReservationProducts,
    (reservationProducts) => reservationProducts.product,
  )
  @JoinColumn()
  reservationProducts: ReservationProducts[];

  @OneToMany(() => Review, (review) => review.product)
  @JoinColumn()
  reviews: Review[];

  @ManyToOne(() => Producer, (producer) => producer.products)
  producer: Producer;
}
