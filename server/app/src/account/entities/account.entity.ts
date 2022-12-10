import { BaseEntityAddHashId } from 'src/common/base-entity-add-hash-id';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

const ROLE = {
  SUPER: 'super',
  ADMIN: 'admin',
  MEMBER: 'member',
};

@Entity()
export class Account extends BaseEntityAddHashId {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ default: null })
  username: string;

  @Column({ default: null })
  email: string;

  @Column({ default: null })
  password: string;

  @Column({ type: 'varchar', default: null })
  role: typeof ROLE[keyof typeof ROLE];

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;

  @DeleteDateColumn()
  readonly deletedAt?: Date;

  @OneToOne(() => User, (user) => user.account)
  @JoinColumn()
  user: User;
}
