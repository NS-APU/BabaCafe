import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateRouteDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
