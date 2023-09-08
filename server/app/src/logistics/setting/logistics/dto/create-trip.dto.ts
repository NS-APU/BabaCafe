import { IsString, IsNotEmpty, IsInt } from 'class-validator';
import { CreateTimetableDto } from './create-timetable.dto';

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

  @IsNotEmpty()
  timetables: CreateTimetableDto[];
}
