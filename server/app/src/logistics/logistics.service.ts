import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account, USER_ATTRIBUTE } from 'src/account/entities/account.entity';
import { CreateLogisticsSettingForIntermediaryDto } from 'src/logistics/setting/intermediary/dto/create-setting.dto';
import { LogisticsSettingForIntermediary } from 'src/logistics/setting/intermediary/entities/setting.entity';
import { LogisticsSettingForLogistics } from 'src/logistics/setting/logistics/entities/setting.entity';
import { CreateLogisticsSettingForProducerDto } from 'src/logistics/setting/producer/dto/create-setting.dto';
import { LogisticsSettingForProducer } from 'src/logistics/setting/producer/entities/setting.entity';
import { MoreThan, Repository } from 'typeorm';
import { CreateShippingScheduleDto } from './schedule/dto/create-shipping-scedule.entity';
import { ShippingSchedule } from './schedule/entities/shipping-schedule.entity';
import { CreateRouteDto } from './setting/logistics/dto/create-route.dto';
import { CreateTripDto } from './setting/logistics/dto/create-trip.dto';
import { UpdateDeliveryTypeDto } from './setting/logistics/dto/update-delivery-type.dto';
import { Route } from './setting/logistics/entities/route.entity';
import { Trip } from './setting/logistics/entities/trip.entity';
import { CreateConsolidationDefinitionDto } from './setting/producer/dto/create-consolidation-define.dto';
import { UserConsolidationDefine } from './setting/producer/entities/consolidation-define.entity';
import { SystemConsolidationDefine } from './setting/system/entities/consolidation-define.entity';

@Injectable()
export class LogisticsService {
  constructor(
    @InjectRepository(LogisticsSettingForProducer)
    private producerSettingRepository: Repository<LogisticsSettingForProducer>,
    @InjectRepository(LogisticsSettingForLogistics)
    private logisticsSettingRepository: Repository<LogisticsSettingForLogistics>,
    @InjectRepository(LogisticsSettingForIntermediary)
    private intermediarySettingRepository: Repository<LogisticsSettingForIntermediary>,
    @InjectRepository(Route)
    private routeRepository: Repository<Route>,
    @InjectRepository(Trip)
    private tripRepository: Repository<Trip>,
    @InjectRepository(ShippingSchedule)
    private shippingScheduleRepository: Repository<ShippingSchedule>,
    @InjectRepository(SystemConsolidationDefine)
    private systemConsolidationDefineRepository: Repository<SystemConsolidationDefine>,
    @InjectRepository(UserConsolidationDefine)
    private userConsolidationDefineRepository: Repository<UserConsolidationDefine>,
  ) {}

  async getLogisticsSetting(logisticsId: string): Promise<LogisticsSettingForLogistics> {
    return await this.logisticsSettingRepository
      .findOne({ where: { logisticsId }, relations: ['routes', 'routes.trips', 'routes.trips.timetables'] })
      .then((setting) => setting);
  }

  async getProducerSetting(producerId: string): Promise<LogisticsSettingForProducer> {
    return await this.producerSettingRepository
      .findOne({ where: { producerId }, relations: ['consolidations'] })
      .then((setting) => setting);
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

  async createRoute(logisticsId: string, dto: CreateRouteDto): Promise<LogisticsSettingForLogistics> {
    const route = new Route();
    await LogisticsService.setProductAttributes(dto, route);
    await route.save();

    const setting = await this.logisticsSettingRepository
      .findOne({
        where: { logisticsId },
        relations: ['routes', 'routes.trips', 'routes.trips.timetables'],
      })
      .then((setting) => setting);

    if (!setting) {
      throw new BadRequestException();
    }

    return setting;
  }

  async deleteRoute(account: Account, logisticsId: string, routeId: string): Promise<LogisticsSettingForLogistics> {
    if (account.id !== logisticsId) {
      throw new BadRequestException();
    }

    const existsSetting = await this.logisticsSettingRepository
      .findOne({ where: { logisticsId, routes: { id: routeId } }, relations: ['routes'] })
      .then((setting) => setting);
    if (!existsSetting) {
      throw new BadRequestException();
    }

    const route = await this.routeRepository.findOne({ where: { id: routeId } });
    await this.routeRepository.remove(route);

    const resSetting = await this.logisticsSettingRepository
      .findOne({
        where: { logisticsId },
        relations: ['routes', 'routes.trips', 'routes.trips.timetables'],
      })
      .then((setting) => setting);

    return resSetting;
  }

  private static async setProductAttributes(dto: CreateRouteDto, route: Route) {
    route.logisticsSettingId = dto.logisticsSettingId;
    route.name = dto.name;
  }

  async createTrip(account: Account, dto: CreateTripDto) {
    // TODO 便追加の処理
  }

  async deleteTrip(
    account: Account,
    logisticsId: string,
    routeId: string,
    tripId: string,
  ): Promise<LogisticsSettingForLogistics> {
    if (account.id !== logisticsId) {
      throw new BadRequestException();
    }

    const existsSetting = await this.logisticsSettingRepository
      .findOne({
        where: { logisticsId, routes: { id: routeId, trips: { id: tripId } } },
        relations: ['routes', 'routes.trips'],
      })
      .then((setting) => setting);
    if (!existsSetting) {
      throw new BadRequestException();
    }

    const trip = await this.tripRepository.findOne({ where: { id: tripId } });
    await this.tripRepository.remove(trip);

    const setting = await this.logisticsSettingRepository
      .findOne({
        where: { logisticsId },
        relations: ['routes', 'routes.trips', 'routes.trips.timetables'],
      })
      .then((setting) => setting);

    if (!setting) {
      throw new BadRequestException();
    }

    return setting;
  }

  async updateDeliveryType(logisticsId: string, dto: UpdateDeliveryTypeDto): Promise<LogisticsSettingForLogistics> {
    const setting = await this.logisticsSettingRepository
      .findOne({
        where: { logisticsId },
        relations: ['routes', 'routes.trips', 'routes.trips.timetables'],
      })
      .then((setting) => setting);

    if (!setting) {
      throw new BadRequestException();
    }

    setting.deliveryType = dto.deliveryType;
    this.logisticsSettingRepository.save(setting);
    return setting;
  }
  async createShippingSchedule(dto: CreateShippingScheduleDto): Promise<ShippingSchedule> {
    const shippingSchedule = this.shippingScheduleRepository.create(dto);
    return await this.shippingScheduleRepository.save(shippingSchedule);
  }

  async getTripSuggestions(
    logisticsId: string,
    pickupStop: string,
    deliveryStop: string,
    count: number,
    tripDate: Date,
  ): Promise<TSuggestTrip[]> {
    const logisticsSetting = await this.getLogisticsSetting(logisticsId);

    if (!logisticsSetting) {
      throw new BadRequestException();
    }

    const checkDate = tripDate;
    checkDate.setHours(checkDate.getHours() + 2);

    const setDate = async (dateObj: Date, timeObj: Date) => {
      const newTimeObj = timeObj;
      newTimeObj.setFullYear(dateObj.getFullYear());
      newTimeObj.setMonth(dateObj.getMonth());
      newTimeObj.setDate(dateObj.getDate());

      return newTimeObj;
    };

    const availableTrips = await Promise.all(
      logisticsSetting.routes.map(async (route) => {
        return await Promise.all(
          route.trips.map(async (trip) => {
            const pickUpTimetable = trip.timetables.find((timetable) => timetable.stop === pickupStop);
            if (!pickUpTimetable) return undefined;
            const deliveryTimetable = trip.timetables.find((timetable) => timetable.stop === deliveryStop);
            if (!deliveryTimetable) return undefined;
            if (pickUpTimetable.time > deliveryTimetable.time) return undefined;

            return {
              routeId: route.id,
              routeName: route.name,
              tripId: trip.id,
              tripName: trip.name,
              capacity: trip.capacity,
              pickupStop: pickUpTimetable.stop,
              pickupTime: pickUpTimetable.time,
              deliveryStop: deliveryTimetable.stop,
              deliveryTime: deliveryTimetable.time,
            };
          }),
        ).then((trips) => trips.filter(Boolean));
      }),
    ).then((routes) => routes.filter(Boolean).flat());

    let filteredTrips = await Promise.all(
      availableTrips.map(async (trip) => {
        const isAvailableTime = checkAvailableTimeTrip(trip, checkDate);
        const isAvailableCapacity = checkAvailableCapacityTrip(trip, this.shippingScheduleRepository, checkDate);

        if (!(await isAvailableTime) || !(await isAvailableCapacity)) return undefined;

        const pickupTime = setDate(checkDate, trip.pickupTime);
        const deliveryTime = setDate(checkDate, trip.deliveryTime);

        return {
          ...trip,
          pickupTime: await pickupTime,
          deliveryTime: await deliveryTime,
        };
      }),
    ).then((trips) => trips.filter(Boolean));

    if (filteredTrips.length < count) {
      checkDate.setDate(checkDate.getDate() + 1);
      const nextDayTrips = await Promise.all(
        availableTrips.map(async (trip) => {
          const isAvailableCapacity = checkAvailableCapacityTrip(trip, this.shippingScheduleRepository, checkDate);

          if (!(await isAvailableCapacity)) return undefined;

          const pickupTime = setDate(checkDate, trip.pickupTime);
          const deliveryTime = setDate(checkDate, trip.deliveryTime);

          return {
            ...trip,
            pickupTime: await pickupTime,
            deliveryTime: await deliveryTime,
          };
        }),
      ).then((trips) => trips.filter(Boolean));
      filteredTrips.push(...nextDayTrips);
    }

    if (filteredTrips.length > count) {
      filteredTrips = filteredTrips.slice(0, count);
    }

    return filteredTrips;
  }

  async getSystemConsolidationDefinition(): Promise<SystemConsolidationDefine[]> {
    return await this.systemConsolidationDefineRepository.find().then((consolidation) => consolidation);
  }

  async createConsolidationDefinition(
    account: Account,
    dto: CreateConsolidationDefinitionDto,
  ): Promise<LogisticsSettingForProducer> {
    if (account.attribute !== USER_ATTRIBUTE.producer) {
      throw new BadRequestException();
    }
    const consolidation = new UserConsolidationDefine();
    consolidation.producerId = account.id;
    consolidation.name = dto.name;
    consolidation.shockLevel = dto.shockLevel;
    await consolidation.save();

    const setting = await this.producerSettingRepository
      .findOne({ where: { producerId: account.id }, relations: ['consolidations'] })
      .then((setting) => setting);

    if (!setting) {
      throw new BadRequestException();
    }

    return setting;
  }

  async updateConsolidationDefinition(
    account: Account,
    consolidationId: string,
    dto: CreateConsolidationDefinitionDto,
  ): Promise<LogisticsSettingForProducer> {
    if (account.attribute !== USER_ATTRIBUTE.producer) {
      throw new BadRequestException();
    }

    const consolidation = await this.userConsolidationDefineRepository
      .findOne({ where: { id: consolidationId, producerId: account.id } })
      .then((consolidation) => consolidation);
    if (!consolidation) {
      throw new BadRequestException();
    }
    consolidation.name = dto.name;
    consolidation.shockLevel = dto.shockLevel;
    await this.userConsolidationDefineRepository.save(consolidation);

    const setting = await this.producerSettingRepository
      .findOne({ where: { producerId: account.id }, relations: ['consolidations'] })
      .then((setting) => setting);

    if (!setting) {
      throw new BadRequestException();
    }

    return setting;
  }

  async deleteConsolidationDefinition(account: Account, consolidationId: string): Promise<LogisticsSettingForProducer> {
    if (account.attribute !== USER_ATTRIBUTE.producer) {
      throw new BadRequestException();
    }

    const consolidation = await this.userConsolidationDefineRepository
      .findOne({ where: { id: consolidationId, producerId: account.id } })
      .then((consolidation) => consolidation);
    if (!consolidation) {
      throw new BadRequestException();
    }
    await this.userConsolidationDefineRepository.remove(consolidation);

    const setting = await this.producerSettingRepository
      .findOne({ where: { producerId: account.id }, relations: ['consolidations'] })
      .then((setting) => setting);

    if (!setting) {
      throw new BadRequestException();
    }

    return setting;
  }
}

export type TSuggestTrip = {
  routeId: string;
  routeName: string;
  tripId: string;
  tripName: string;
  capacity: number;
  pickupStop: string;
  pickupTime: Date;
  deliveryStop: string;
  deliveryTime: Date;
};

async function checkAvailableTimeTrip(suggestTrip: TSuggestTrip, checkDate: Date) {
  const pickupTime = suggestTrip.pickupTime.getHours() * 60 + suggestTrip.pickupTime.getMinutes();
  const isAvailableTime = pickupTime > checkDate.getHours() * 60 + checkDate.getMinutes();

  return isAvailableTime;
}

async function checkAvailableCapacityTrip(
  suggestTrip: TSuggestTrip,
  shippingScheduleRepository: Repository<ShippingSchedule>,
  checkDate: Date,
) {
  const shippingScheduleReservationIds = await shippingScheduleRepository
    .findBy({
      tripId: suggestTrip.tripId,
      pickupTime: MoreThan(checkDate),
    })
    .then((shippingSchedules) => shippingSchedules.map((shippingSchedule) => shippingSchedule.reservationIds));

  const reservationCount = shippingScheduleReservationIds.reduce(
    (acc, reservationIds) => acc + reservationIds.length,
    0,
  );

  return reservationCount <= suggestTrip.capacity;
}
