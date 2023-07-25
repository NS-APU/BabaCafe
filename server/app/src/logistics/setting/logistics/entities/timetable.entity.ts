import { Trip } from 'src/logistics/setting/logistics/entities/trip.entity';
import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Timetable extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { comment: 'ID' })
  readonly id!: string;

  @Column({ comment: '便ID', type: 'uuid', name: 'trip_id' })
  tripId!: string;

  @Column({ comment: '停車場所', type: 'varchar', length: 50, name: 'stop' })
  stop!: string;

  @Column({ comment: '時刻', type: 'timestamp' })
  time!: Date;

  @ManyToOne(() => Trip, (trip) => trip.timetables, {
    cascade: ['remove'],
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'trip_id', referencedColumnName: 'id' })
  trip: Trip;
}
