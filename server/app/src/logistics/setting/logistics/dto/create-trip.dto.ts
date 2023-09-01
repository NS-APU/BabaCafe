import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateTripDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  shockLevel: number;

  @IsNotEmpty()
  @IsInt()
  capacity: number;

  //   TODO: 時刻表も保持させる
}
