import { Account } from 'src/account/entities/account.entity';
import { Route } from 'src/logistics/setting/logistics/entities/route.entity';
import { BaseEntity, Entity, Column, JoinColumn, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';

export const DELIVERY_TYPE = {
  route: 'route',
  direct: 'direct',
} as const;

@Entity('logistics_setting_for_logistics')
export class LogisticsSettingForLogistics extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { comment: 'ID' })
  readonly id!: string;

  @Column({ comment: '物流業者ID', type: 'uuid', name: 'logistics_id' })
  logisticsId!: string;

  @Column({ comment: '集荷・配送方法', type: 'varchar', length: 10, name: 'delivery_type' })
  deliveryType!: typeof DELIVERY_TYPE[keyof typeof DELIVERY_TYPE];

  @OneToOne(() => Account, (account) => account.logisticsSettingForLogistics, {
    cascade: ['remove'],
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'logistics_id', referencedColumnName: 'id' })
  logistics: Account;

  @OneToMany(() => Route, (route) => route.setting)
  routes: Route[];
}

export type TLogisticsSettingForLogistics = Pick<LogisticsSettingForLogistics, 'logisticsId' | 'deliveryType'> & {
  id: string;
  logistics: Account;
  routes: Route[];
};
