import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRouteDto {
  @IsNotEmpty()
  @IsString()
  logisticsSettingId: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
