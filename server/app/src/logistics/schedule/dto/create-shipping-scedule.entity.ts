import { IsNotEmpty, IsDateString, IsUUID, IsString, IsArray, IsOptional } from 'class-validator';

export interface ICreateShippingScheduleDto {
  logisticsName: string;
  routeId: string;
  routeName: string;
  tripId: string;
  tripName: string;
  pickupStop: string;
  pickupTime: string;
  deliveryStop: string;
  deliveryTime: string;
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

  @IsOptional()
  @IsArray()
  reservationIds: string[];
}
