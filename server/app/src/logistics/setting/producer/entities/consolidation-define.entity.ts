import { LogisticsSettingForProducer } from 'src/logistics/setting/producer/entities/setting.entity';
import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('user_consolidation_define')
export class UserConsolidationDefine extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { comment: 'ID' })
  readonly id!: string;

  @Column({ comment: '生産者ID', type: 'uuid', name: 'producer_id' })
  producerId!: string;

  @Column({ comment: '名称', type: 'varchar', length: 50 })
  name!: string;

  @Column({ comment: '衝撃度合い', type: 'int', name: 'shock_level' })
  shockLevel!: number;

  @ManyToOne(() => LogisticsSettingForProducer, (setting) => setting.consolidations, {
    cascade: ['remove'],
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'producer_id', referencedColumnName: 'producerId' })
  setting: LogisticsSettingForProducer;
}

export type TUserConsolidationDefine = Pick<UserConsolidationDefine, 'producerId' | 'name' | 'shockLevel'> & {
  id: string;
};
