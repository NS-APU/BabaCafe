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

const LINE_CONFIG_STATUS = {
  ON: 'on',
  OFF: 'off',
} as const;

@Entity()
export class LineConfig extends BaseEntityAddHashId {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ default: null })
  name: string;

  @Column({ default: null })
  description: string;

  @Column({ type: 'varchar', default: null })
  status: typeof LINE_CONFIG_STATUS[keyof typeof LINE_CONFIG_STATUS];

  @Column({ default: null })
  channelId: string;

  @Column({ default: null })
  channelSecret: string;

  @Column({ default: null })
  channelToken: string;

  @Column({ default: null })
  addFriendUrl: string;

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;

  @DeleteDateColumn()
  readonly deletedAt?: Date;

  @OneToOne(() => LineProvider, (lineProvider) => lineProvider.lineConfig)
  @JoinColumn()
  lineProvider: LineProvider;
}
