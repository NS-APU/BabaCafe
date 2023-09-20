import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class UpdateTimetableDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  stop: string;

  @IsNotEmpty()
  @IsDate()
  time: Date;

  @IsNotEmpty()
  @IsString()
  tripId: string;
}
