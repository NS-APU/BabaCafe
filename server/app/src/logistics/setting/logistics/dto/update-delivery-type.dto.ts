import { IsNotEmpty, IsEnum } from 'class-validator';
import { DELIVERY_TYPE } from '../entities/setting.entity';

export class UpdateDeliveryTypeDto {
  @IsNotEmpty()
  @IsEnum(DELIVERY_TYPE)
  deliveryType: typeof DELIVERY_TYPE[keyof typeof DELIVERY_TYPE];
}
