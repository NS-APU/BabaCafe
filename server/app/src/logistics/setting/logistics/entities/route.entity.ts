import { LogisticsSettingForLogistics } from 'src/logistics/setting/logistics/entities/setting.entity';
import { Trip } from 'src/logistics/setting/logistics/entities/trip.entity';
import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity()
export class Route extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { comment: 'ID' })
  readonly id!: string;

  @Column({ comment: '物流業者向け物流設定ID', type: 'uuid', name: 'logistics_setting_id' })
  logisticsSettingId!: string;

  @Column({ comment: '路線名称', type: 'varchar', length: 50 })
  name!: string;

  @ManyToOne(() => LogisticsSettingForLogistics, (setting) => setting.routes, {
    cascade: ['remove'],
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'logistics_setting_id', referencedColumnName: 'id' })
  setting: LogisticsSettingForLogistics;

  @OneToMany(() => Trip, (trip) => trip.route)
  trips: Trip[];
}

export type TRoute = Pick<Route, 'logisticsSettingId' | 'name'> & {
  id: string;
  setting: LogisticsSettingForLogistics;
  trips: Trip[];
};
