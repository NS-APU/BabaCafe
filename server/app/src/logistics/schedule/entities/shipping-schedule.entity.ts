import { Reservation } from 'src/reservation/entities/reservation.entity';
import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne } from 'typeorm';

@Entity()
export class ShippingSchedule extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { comment: 'ID' })
  readonly id!: string;

  @Column({ comment: '物流業者ID', type: 'uuid', name: 'logistics_id' })
  logisticsId!: string;

  @Column({ comment: '物流業者名', type: 'varchar', length: 30, name: 'logistics_name' })
  logisticsName!: string;

  @Column({ comment: '路線ID', type: 'uuid', name: 'route_id' })
  routeId!: string;

  @Column({ comment: '路線名', type: 'varchar', length: 50, name: 'route_name' })
  routeName!: string;

  @Column({ comment: '便ID', type: 'uuid', name: 'trip_id' })
  tripId!: string;

  @Column({ comment: '便名', type: 'varchar', length: 50, name: 'trip_name' })
  tripName!: string;

  @Column({ comment: '集荷場所', type: 'varchar', length: 50, name: 'pickup_stop' })
  pickupStop!: string;

  @Column({ comment: '集荷予定時刻', type: 'timestamp', name: 'pickup_time' })
  pickupTime!: Date;

  @Column({ comment: '配送場所', type: 'varchar', length: 50, name: 'delivery_stop' })
  deliveryStop!: string;

  @Column({ comment: '配送予定時刻', type: 'timestamp', name: 'delivery_time' })
  deliveryTime!: Date;

  @Column({ comment: '出荷予約ID一覧', type: 'simple-array' })
  reservations!: string[];

  @CreateDateColumn({
    comment: '作成日時',
    type: 'timestamptz',
    name: 'created_at',
  })
  readonly createdAt?: Date;

  @OneToOne(() => Reservation, (reservation) => reservation.shippingSchedule)
  reservation: Reservation;
}
