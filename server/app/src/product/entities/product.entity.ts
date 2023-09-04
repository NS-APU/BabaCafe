import { Account } from 'src/account/entities/account.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';
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

export const CROP_KINDS = {
  vegetables: 'vegetables', // 野菜
  grains: 'grains', // 穀物
  fruits: 'fruits', // 果物
  flowers: 'flowers', // 花
  livestock: 'livestock', // 畜産物
  others: 'others', // その他
};

export const CROP_UNITS = {
  gram: 'gram', // g
  stalk: 'stalk', // 本
  piece: 'piece', // 個
  portion: 'portion', // 玉
  share: 'share', // 株
  bundle: 'bundle', // 束
  pile: 'pile', // 山
  pack: 'pack', // パック
  bag: 'bag', // 袋
};

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { comment: '出品ID' })
  readonly id!: string;

  @Column({ comment: '生産者ID', type: 'uuid', name: 'producer_id' })
  producerId: string;

  @Column({ comment: '作物名', type: 'varchar', length: 30 })
  name!: string;

  @Column({ comment: '作物の種類', type: 'varchar', length: 10 })
  kinds!: typeof CROP_KINDS[keyof typeof CROP_KINDS];

  @Column({ comment: '説明', type: 'text', default: '' })
  description?: string;

  @Column({ comment: '予約開始', type: 'timestamptz', name: 'start_at' })
  startAt!: Date;

  @Column({ comment: '予約終了', type: 'timestamptz', name: 'end_at' })
  endAt!: Date;

  @Column({ comment: '単位', type: 'varchar', length: 10 })
  unit!: typeof CROP_UNITS[keyof typeof CROP_UNITS];

  @Column({
    comment: '単価数量',
    type: 'int',
    default: 1,
    name: 'unit_quantity',
  })
  unitQuantity: number;

  @Column({ comment: '単価', type: 'int', default: 1, name: 'unit_price' })
  unitPrice!: number;

  @Column({ comment: '画像', type: 'text', default: null, nullable: true })
  image?: string;

  @Column({ comment: '予約数量', type: 'int', default: 1 })
  quantity: number;

  @Column({ comment: '残数量', type: 'int', default: 1 })
  remaining: number;

  @Column({ comment: '衝撃度合い', type: 'int', name: 'shock_level' })
  shockLevel: number;

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

  @ManyToOne(() => Account, (account) => account.products)
  @JoinColumn({ name: 'producer_id', referencedColumnName: 'id' })
  producer: Account;

  @OneToMany(() => Reservation, (reservation) => reservation.product)
  reservations: Reservation[];

  convertTProduct(): TProduct {
    return {
      ...this,
      image: this.image,
      producer: this.producer,
      reservations: this.reservations,
    };
  }
}

export type TProduct = Pick<
  Product,
  | 'producerId'
  | 'name'
  | 'kinds'
  | 'description'
  | 'startAt'
  | 'endAt'
  | 'unit'
  | 'unitQuantity'
  | 'unitPrice'
  | 'image'
  | 'quantity'
  | 'remaining'
  | 'createdAt'
  | 'updatedAt'
  | 'deletedAt'
  | 'shockLevel'
> & {
  id: string;
  producer: Account;
  reservations: Reservation[];
};
