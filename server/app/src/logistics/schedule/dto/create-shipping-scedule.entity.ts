import { IsNotEmpty, IsDateString, IsUUID, IsString, IsArray } from 'class-validator';

export interface ICreateShippingScheduleDto {
  logisticsId: string;
  logisticsName: string;
  routeId: string;
  routeName: string;
  tripId: string;
  tripName: string;
  pickupStop: string;
  pickupTime: string;
  deliveryStop: string;
  deliveryTime: string;
  reservationIds: string[];
}

export class CreateShippingScheduleDto implements ICreateShippingScheduleDto {
  @IsNotEmpty()
  @IsUUID()
  logisticsId: string;

  @IsString()
  logisticsName: string;

  @IsNotEmpty()
  @IsUUID()
  routeId: string;

  @IsString()
  routeName: string;

  @IsNotEmpty()
  @IsUUID()
  tripId: string;

  @IsString()
  tripName: string;

  @IsNotEmpty()
  @IsString()
  pickupStop: string;

  @IsNotEmpty()
  @IsDateString()
  pickupTime: string;

  @IsNotEmpty()
  @IsString()
  deliveryStop: string;

  @IsNotEmpty()
  @IsDateString()
  deliveryTime: string;

  @IsArray()
  reservationIds: string[];
}
