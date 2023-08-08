import { Account } from 'src/account/entities/account.entity';
import { UserConsolidationDefine } from 'src/logistics/setting/producer/entities/consolidation-define.entity';
import { BaseEntity, Entity, Column, JoinColumn, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';

export const PRODUCER_DEFAULT_STOP = 'Unselected';

@Entity('logistics_setting_for_producer')
export class LogisticsSettingForProducer extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { comment: 'ID' })
  readonly id!: string;

  @Column({ comment: '生産者ID', type: 'uuid', name: 'producer_id' })
  producerId!: string;

  @Column({ comment: '最寄りのバス停', type: 'varchar', length: 50, name: 'stop' })
  stop!: string;

  @OneToOne(() => Account, (account) => account.logisticsSettingForProducer, {
    cascade: ['remove'],
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'producer_id', referencedColumnName: 'id' })
  producer: Account;

  @OneToMany(() => UserConsolidationDefine, (consolidation) => consolidation.setting)
  consolidations: UserConsolidationDefine[];
}

export type TLogisticsSettingForProducer = Pick<LogisticsSettingForProducer, 'producerId' | 'stop'> & {
  id: string;
  producer: Account;
};
