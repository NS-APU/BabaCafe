import { BaseEntityAddHashId } from 'src/common/base-entity-add-hash-id';
import { Shop } from 'src/shop/entities/shop.entity';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Staff extends BaseEntityAddHashId {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  readonly id: number;

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;

  @DeleteDateColumn()
  readonly deletedAt?: Date;

  @OneToOne(() => User, (user) => user.staff)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Shop, (shop) => shop.staffs)
  shop: Shop;
}
