import { Shop } from 'src/shop/entities/shop.entity';
import { Consumer } from 'src/user/entities/consumer.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LiffConfig } from './liff-config.entity';
import { LineConfig } from './line-config.entity';

@Entity()
export class LineProvider extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ default: null })
  hashId: string;

  @Column({ default: null })
  name: string;

  @Column({ default: null })
  description: string;

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;

  @DeleteDateColumn()
  readonly deletedAt?: Date;

  @OneToOne(() => LineConfig, (lineConfig) => lineConfig.lineProvider)
  lineConfig: LineConfig;

  @OneToOne(() => LiffConfig, (liffConfig) => liffConfig.lineProvider)
  liffConfig: LiffConfig;

  @OneToOne(() => Shop, (shop) => shop.lineProvider)
  @JoinColumn()
  shop: Shop;

  @ManyToMany(() => Consumer, (consumer) => consumer.lineProviders)
  @JoinTable()
  consumers: Consumer[];
}
