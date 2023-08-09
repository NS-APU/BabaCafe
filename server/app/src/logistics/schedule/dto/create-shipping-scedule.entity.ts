import { IsNotEmpty, IsDateString, IsUUID, IsString, IsArray } from 'class-validator';

export class CreateShippingScheduleDto {
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
