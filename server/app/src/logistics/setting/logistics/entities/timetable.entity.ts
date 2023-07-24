import { Flight } from 'src/logistics/setting/logistics/entities/flight.entity';
import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Timetable extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { comment: 'ID' })
  readonly id!: string;

  @Column({ comment: '便ID', type: 'uuid', name: 'flight_id' })
  flightId!: string;

  @Column({ comment: 'バス停', type: 'varchar', length: 50, name: 'bus_stop' })
  busStop!: string;

  @Column({ comment: '時刻', type: 'timestamp' })
  time!: Date;

  @ManyToOne(() => Flight, (flight) => flight.timetables, {
    cascade: ['remove'],
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'flight_id', referencedColumnName: 'id' })
  flight: Flight;
}
