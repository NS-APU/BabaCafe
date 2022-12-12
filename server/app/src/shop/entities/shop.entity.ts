import { BaseEntityAddHashId } from 'src/common/base-entity-add-hash-id';
import { LineProvider } from 'src/line/entities/line-provider.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { Staff } from 'src/user/entities/staff.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Shop extends BaseEntityAddHashId {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

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
  description: string;

  @Column({ default: null })
  openedAt: Date;

  @Column({ default: null })
  closedAt: Date;

  @OneToOne(() => LineProvider, (lineProvider) => lineProvider.shop)
  lineProvider: LineProvider;

  @OneToMany(() => Reservation, (reservation) => reservation.shop)
  reservations: Reservation[];

  @OneToMany(() => Staff, (staff) => staff.shop)
  staffs: Staff[];

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;

  @DeleteDateColumn()
  readonly deletedAt?: Date;
}
