import { BaseEntityAddHashId } from 'src/common/base-entity-add-hash-id';
import { LineProvider } from 'src/line/entities/line-provider.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';
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

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;

  @DeleteDateColumn()
  readonly deletedAt?: Date;

  convertTShop() {
    return {
      ...this,
      id: this.hashId,
      reservations: this.reservations.map(
        (reservation) => reservation.convertTReservation() || [],
      ),
    };
  }
}

export type TShop = Pick<
  Shop,
  | 'name'
  | 'email'
  | 'tel'
  | 'zipCode'
  | 'address'
  | 'address2'
  | 'description'
  | 'openedAt'
  | 'closedAt'
  | 'createdAt'
  | 'updatedAt'
  | 'deletedAt'
> & {
  id: string;
  lineProvider?: LineProvider;
  reservations: Reservation[];
};
