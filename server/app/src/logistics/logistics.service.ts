import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/account/entities/account.entity';
import { CreateLogisticsSettingForIntermediaryDto } from 'src/logistics/setting/intermediary/dto/create-setting.dto';
import { LogisticsSettingForIntermediary } from 'src/logistics/setting/intermediary/entities/setting.entity';
import { LogisticsSettingForLogistics } from 'src/logistics/setting/logistics/entities/setting.entity';
import { CreateLogisticsSettingForProducerDto } from 'src/logistics/setting/producer/dto/create-setting.dto';
import { LogisticsSettingForProducer } from 'src/logistics/setting/producer/entities/setting.entity';
import { Repository } from 'typeorm';
import { CreateShippingScheduleDto } from './schedule/dto/create-shipping-scedule.entity';
import { ShippingSchedule } from './schedule/entities/shipping-schedule.entity';
import { Trip } from './setting/logistics/entities/trip.entity';

@Injectable()
export class LogisticsService {
  constructor(
    @InjectRepository(LogisticsSettingForProducer)
    private producerSettingRepository: Repository<LogisticsSettingForProducer>,
    @InjectRepository(LogisticsSettingForLogistics)
    private logisticsSettingRepository: Repository<LogisticsSettingForLogistics>,
    @InjectRepository(LogisticsSettingForIntermediary)
    private intermediarySettingRepository: Repository<LogisticsSettingForIntermediary>,
    @InjectRepository(Trip)
    private tripRepository: Repository<Trip>,
    @InjectRepository(ShippingSchedule)
    private shippingScheduleRepository: Repository<ShippingSchedule>,
  ) {}

  async getLogisticsSetting(logisticsId: string): Promise<LogisticsSettingForLogistics> {
    return await this.logisticsSettingRepository
      .findOne({ where: { logisticsId }, relations: ['routes', 'routes.trips', 'routes.trips.timetables'] })
      .then((setting) => setting);
  }

  async getProducerSetting(producerId: string): Promise<LogisticsSettingForProducer> {
    return await this.producerSettingRepository.findOne({ where: { producerId } }).then((setting) => setting);
  }

  async getIntermediarySetting(intermediaryId: string): Promise<LogisticsSettingForIntermediary> {
    return await this.intermediarySettingRepository.findOne({ where: { intermediaryId } }).then((setting) => setting);
  }

  async updateProducerSetting(
    account: Account,
    producerId: string,
    dto: CreateLogisticsSettingForProducerDto,
  ): Promise<LogisticsSettingForProducer> {
    const setting = await this.producerSettingRepository
      .findOne({
        where: { producerId },
      })
      .then((setting) => setting);

    if (!setting) {
      throw new BadRequestException();
    }
    if (setting.producerId !== account.id) {
      throw new BadRequestException();
    }

    setting.stop = dto.stop;
    this.producerSettingRepository.save(setting);
    return setting;
  }

  async updateIntermediarySetting(
    account: Account,
    intermediaryId: string,
    dto: CreateLogisticsSettingForIntermediaryDto,
  ): Promise<LogisticsSettingForIntermediary> {
    const setting = await this.intermediarySettingRepository
      .findOne({
        where: { intermediaryId },
      })
      .then((setting) => setting);

    if (!setting) {
      throw new BadRequestException();
    }
    if (setting.intermediaryId !== account.id) {
      throw new BadRequestException();
    }

    setting.stop = dto.stop;
    this.intermediarySettingRepository.save(setting);
    return setting;
  }

  async createShippingSchedule(dto: CreateShippingScheduleDto): Promise<ShippingSchedule> {
    const shippingSchedule = this.shippingScheduleRepository.create(dto);
    return await this.shippingScheduleRepository.save(shippingSchedule);
  }

  async getTripSuggestions(pickupStop: string, deliveryStop: string, count: number): Promise<TSuggestTrip[]> {
    const trips = await this.tripRepository
      .createQueryBuilder('trip')
      .innerJoinAndSelect('trip.timetables', 'deliverytimetable', 'deliverytimetable.stop = :deliveryStop', {
        deliveryStop,
      })
      .innerJoinAndSelect('trip.timetables', 'pickuptimetable', 'pickuptimetable.stop = :pickupStop', { pickupStop })
      .leftJoinAndSelect('trip.route', 'route')
      .orderBy('pickuptimetable.time', 'ASC')
      .getMany();

    const tripFilter = await Promise.all(
      trips.map(async (trip) => {
        const pickupTime = trip.timetables[0].time.getHours() * 60 + trip.timetables[0].time.getMinutes();
        const now = new Date();
        const isAvailableTime = pickupTime > (now.getHours() + 2) * 60 + now.getMinutes();

        const shippingScheduleReservations = await this.shippingScheduleRepository
          .find({
            relations: ['reservations'],
            where: { tripId: trip.id },
          })
          .then((shippingSchedules) => shippingSchedules.map((shippingSchedule) => shippingSchedule.reservations));

        const reservationCount = shippingScheduleReservations.reduce(
          (acc, reservations) => acc + reservations.length,
          0,
        );

        return isAvailableTime && reservationCount <= trip.capacity;
      }),
    );

    let suggestTrips = trips.filter((_, index) => tripFilter[index]);

    if (suggestTrips.length < count) {
      suggestTrips.push(...trips.slice(0, count - suggestTrips.length));
    } else if (suggestTrips.length > count) {
      suggestTrips = suggestTrips.slice(0, count);
    }

    return suggestTrips.map((trip): TSuggestTrip => {
      return {
        routeId: trip.route.id,
        routeName: trip.route.name,
        tripId: trip.id,
        tripName: trip.name,
        pickupStop: trip.timetables[0].stop,
        pickupTime: trip.timetables[0].time,
      };
    });
  }
}

export type TSuggestTrip = {
  routeId: string;
  routeName: string;
  tripId: string;
  tripName: string;
  pickupStop: string;
  pickupTime: Date;
};
