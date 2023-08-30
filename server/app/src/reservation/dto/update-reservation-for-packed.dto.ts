import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ICreateShippingScheduleDto } from 'src/logistics/schedule/dto/create-shipping-scedule.entity';

export class UpdateReservationForPackedDto implements ICreateShippingScheduleDto {
  @IsNotEmpty()
  @IsUUID()
  shipperId: string;

  @IsOptional()
  @IsUUID()
  logisticsId: string;

  @IsOptional()
  @IsString()
  logisticsName: string;

  @IsOptional()
  @IsUUID()
  routeId: string;

  @IsOptional()
  @IsString()
  routeName: string;

  @IsOptional()
  @IsUUID()
  tripId: string;

  @IsOptional()
  @IsString()
  tripName: string;

  @IsOptional()
  @IsString()
  pickupStop: string;

  @IsOptional()
  @IsDateString()
  pickupTime: string;

  @IsOptional()
  @IsString()
  deliveryStop: string;

  @IsOptional()
  @IsDateString()
  deliveryTime: string;
}
