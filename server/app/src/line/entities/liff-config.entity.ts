import { BaseEntityAddHashId } from 'src/common/base-entity-add-hash-id';
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
import { LineProvider } from './line-provider.entity';

export const LIFF_TYPE = {
  FULL: 'full',
  TALL: 'tall',
  COMPACT: 'compact',
} as const;

@Entity()
export class LiffConfig extends BaseEntityAddHashId {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  liffId: string;

  @Column({ default: null })
  name: string;

  @Column({ default: null })
  description: string;

  @Column({ type: 'varchar', default: null })
  type: typeof LIFF_TYPE[keyof typeof LIFF_TYPE];

  @Column({ default: null })
  channelId: string;

  @Column({ default: null })
  channelSecret: string;

  @Column({ default: null })
  token: string;

  @Column({ default: null, comment: 'tokenの利用期限' })
  tokenExpire: Date;

  @OneToOne(() => LineProvider, (lineProvider) => lineProvider.liffConfig)
  @JoinColumn()
  lineProvider: LineProvider;

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;

  @DeleteDateColumn()
  readonly deletedAt?: Date;
}
