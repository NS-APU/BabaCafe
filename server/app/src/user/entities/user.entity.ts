import { Account } from 'src/auth/entities/account.entity';
import { BaseEntityAddHashId } from 'src/common/base-entity-add-hash-id';
import { Review } from 'src/product/entities/review.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Consumer } from './consumer.entity';
import { Producer } from './producer.entity';
import { Staff } from './staff.entity';

export const USER_STATUS = {
  PRODUCER: 'producer',
  CONSUMER: 'consumer',
  STAFF: 'staff',
} as const;

@Entity()
export class User extends BaseEntityAddHashId {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  readonly id: number;

  @Column({ default: null })
  name: string;

  @Column({ default: null })
  email: string;

  @Column({ default: null })
  tel: string;

  @Column({ default: null })
  zipCode: string;

  @Column({ default: null })
  address: string;

  @Column({ default: null })
  address2: string;

  @Column({ default: null })
  gender: string;

  @Column({ type: 'varchar', default: null })
  mainStatus: typeof USER_STATUS[keyof typeof USER_STATUS];

  @Column({ default: null })
  birthday: Date;

  @OneToOne(() => Staff, (staff) => staff.user)
  staff: Staff;

  @OneToOne(() => Producer, (producer) => producer.user)
  producer: Producer;

  @OneToOne(() => Consumer, (consumer) => consumer.user)
  consumer: Consumer;

  @OneToOne(() => Account, (account) => account.user)
  account: Account;

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[];

  @OneToMany(() => Review, (review) => review.user)
  @JoinColumn()
  reviews: Review[];

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;

  @DeleteDateColumn()
  readonly deletedAt?: Date;
}
