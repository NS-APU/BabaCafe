import { IsString, IsNotEmpty } from 'class-validator';

export class CreateLogisticsSettingForIntermediaryDto {
  @IsNotEmpty()
  @IsString()
  stop: string;
}
