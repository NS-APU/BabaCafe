import { Route } from 'src/logistics/setting/logistics/entities/route.entity';
import { Timetable } from 'src/logistics/setting/logistics/entities/timetable.entity';
import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity()
export class Trip extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { comment: 'ID' })
  readonly id!: string;

  @Column({ comment: '路線ID', type: 'uuid', name: 'route_id' })
  routeId!: string;

  @Column({ comment: '便名称', type: 'varchar', length: 50 })
  name!: string;

  @Column({ comment: '衝撃度合い', type: 'int', name: 'shock_level' })
  shockLevel!: number;

  @Column({ comment: '最大取扱量', type: 'int', name: 'capacity' })
  capacity!: number;

  @ManyToOne(() => Route, (route) => route.trips, {
    cascade: ['remove'],
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'route_id', referencedColumnName: 'id' })
  route: Route;

  @OneToMany(() => Timetable, (timetable) => timetable.trip)
  timetables: Timetable[];
}

export type TTrip = Pick<Trip, 'routeId' | 'name' | 'shockLevel' | 'capacity'> & {
  id: string;
  route: Route;
  timetables: Timetable[];
};
