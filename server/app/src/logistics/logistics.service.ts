import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/account/entities/account.entity';
import { CreateLogisticsSettingForIntermediaryDto } from 'src/logistics/setting/intermediary/dto/create-setting.dto';
import { LogisticsSettingForIntermediary } from 'src/logistics/setting/intermediary/entities/setting.entity';
import { LogisticsSettingForLogistics } from 'src/logistics/setting/logistics/entities/setting.entity';
import { CreateLogisticsSettingForProducerDto } from 'src/logistics/setting/producer/dto/create-setting.dto';
import { LogisticsSettingForProducer } from 'src/logistics/setting/producer/entities/setting.entity';
import { MoreThan, Repository } from 'typeorm';
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

  async getTripSuggestions(
    pickupStop: string,
    deliveryStop: string,
    count: number,
    tripDate: Date,
  ): Promise<TSuggestTrip[]> {
    const trips = await this.tripRepository
      .createQueryBuilder('trip')
      .innerJoinAndSelect('trip.timetables', 'deliverytimetable', 'deliverytimetable.stop = :deliveryStop', {
        deliveryStop,
      })
      .innerJoinAndSelect('trip.timetables', 'pickuptimetable', 'pickuptimetable.stop = :pickupStop', { pickupStop })
      .leftJoinAndSelect('trip.route', 'route')
      .orderBy('pickuptimetable.time', 'ASC')
      .getMany();

    if (!trips) {
      throw new BadRequestException();
    }

    const checkDate = tripDate;
    checkDate.setHours(checkDate.getHours() + 2);
    const tripFilter = await Promise.all(
      trips.map(async (trip) => {
        const isAvailableTime = checkAvailableTimeTrip(trip, pickupStop, checkDate);
        const isAvailableCapacity = checkAvailableCapacityTrip(trip, this.shippingScheduleRepository, checkDate);
        return isAvailableTime && isAvailableCapacity;
      }),
    );

    let filteredTrips = trips.filter((_, index) => tripFilter[index]);

    if (filteredTrips.length < count) {
      const nextDay = tripDate;
      nextDay.setDate(nextDay.getDate() + 1);
      const nextDayTripFilter = await Promise.all(
        trips.map(async (trip) => {
          return checkAvailableCapacityTrip(trip, this.shippingScheduleRepository, nextDay);
        }),
      );
      const nextDayTrips = trips.filter((_, index) => nextDayTripFilter[index]);
      filteredTrips.push(...nextDayTrips);
    }

    if (filteredTrips.length > count) {
      filteredTrips = filteredTrips.slice(0, count);
    }

    const suggestTrips = await Promise.all(
      filteredTrips.map(async (trip) => {
        return makeTripSuggestions(trip, pickupStop, tripDate);
      }),
    );

    return suggestTrips;
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

async function checkAvailableTimeTrip(trip: Trip, pickupStop: string, checkDate: Date) {
  const pickupTimetable = trip.timetables.find((timetable) => timetable.stop === pickupStop);
  const pickupTime = pickupTimetable.time.getHours() * 60 + pickupTimetable.time.getMinutes();
  const isAvailableTime = pickupTime > checkDate.getHours() * 60 + checkDate.getMinutes();

  return isAvailableTime;
}

async function checkAvailableCapacityTrip(
  trip: Trip,
  shippingScheduleRepository: Repository<ShippingSchedule>,
  checkDate: Date,
) {
  const shippingScheduleReservations = await shippingScheduleRepository
    .findBy({
      tripId: trip.id,
      pickupTime: MoreThan(checkDate),
    })
    .then((shippingSchedules) => shippingSchedules.map((shippingSchedule) => shippingSchedule.reservations));

  const reservationCount = shippingScheduleReservations.reduce((acc, reservations) => acc + reservations.length, 0);

  return reservationCount <= trip.capacity;
}

async function makeTripSuggestions(trip: Trip, pickupStop: string, now: Date) {
  const pickupTimetable = trip.timetables.find((timetable) => timetable.stop === pickupStop);
  const pickupTime = pickupTimetable.time;
  pickupTime.setFullYear(now.getFullYear());
  pickupTime.setMonth(now.getMonth());
  pickupTime.setDate(now.getDate());

  return {
    routeId: trip.route.id,
    routeName: trip.route.name,
    tripId: trip.id,
    tripName: trip.name,
    pickupStop: pickupTimetable.stop,
    pickupTime: pickupTime,
  };
}
