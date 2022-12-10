import { BaseEntityAddHashId } from 'src/common/base-entity-add-hash-id';
import { LineProvider } from 'src/line/entities/line-provider.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Consumer extends BaseEntityAddHashId {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  readonly id: number;

  @Column({ default: null })
  lineName: string;

  @Column({ default: null })
  image: string;

  @Column({ default: null })
  tel: string;

  @Column({ default: true, comment: 'ブロック判定' })
  follow: boolean;

  @OneToOne(() => User, (user) => user.consumer)
  @JoinColumn()
  user: User;

  @ManyToMany(() => LineProvider, (lineProvider) => lineProvider.consumers)
  lineProviders: LineProvider[];

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;

  @DeleteDateColumn()
  readonly deletedAt?: Date;
}
