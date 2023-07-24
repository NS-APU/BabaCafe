import { Account } from 'src/account/entities/account.entity';
import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

export const INTERMEDIARY_DEFAULT_BUS_STOP = 'Unselected';

@Entity('logistics_setting_for_intermediary')
export class LogisticsSettingForIntermediary extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { comment: 'ID' })
  readonly id!: string;

  @Column({ comment: '引渡し業者ID', type: 'uuid', name: 'intermediary_id' })
  intermediaryId!: string;

  @Column({ comment: '最寄りのバス停', type: 'varchar', length: 50, name: 'bus_stop' })
  busStop!: string;

  @OneToOne(() => Account, (account) => account.logisticsSettingForIntermediary, {
    cascade: ['remove'],
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'intermediary_id', referencedColumnName: 'id' })
  intermediary: Account;
}
