import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

const USER_STATUS = {
  PRODUCER: 'producer',
  CONSUMER: 'consumer',
  STAFF: 'staff',
} as const;

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn({ type: 'bigint' })
  readonly id: number;

  @Column({ default: null })
  hashId: string;

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

  @OneToOne(() => User, (staff) => staff.user)
  user: User;

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;

  @DeleteDateColumn()
  readonly deletedAt?: Date;
}
