import { IsString, IsNotEmpty, IsInt } from 'class-validator';
import { UpdateTimetableDto } from './update-timetable.dto';

export class UpdateTripDto {
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
  timetables: UpdateTimetableDto[];
}
