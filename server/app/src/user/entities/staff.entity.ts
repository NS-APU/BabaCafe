import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Staff extends BaseEntity {
  @PrimaryColumn({ type: 'bigint' })
  readonly id: number;

  @Column({ default: null })
  hashId: string;

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;

  @DeleteDateColumn()
  readonly deletedAt?: Date;

  @OneToOne(() => User, (staff) => staff.user)
  @JoinColumn()
  user: User;

  // @ManyToOne(() => Shop, (shop) => shop.staffs)
  // shop: Shop;
  // @Column({ default: null })
  // @Index()
  // shopId: number;
}
