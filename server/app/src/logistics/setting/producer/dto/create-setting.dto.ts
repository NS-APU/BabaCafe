import { IsString, IsNotEmpty } from 'class-validator';

export class CreateLogisticsSettingForProducerDto {
  @IsNotEmpty()
  @IsString()
  stop: string;
}
