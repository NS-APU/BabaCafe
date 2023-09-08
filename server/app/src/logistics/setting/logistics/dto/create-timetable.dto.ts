import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateTimetableDto {
  @IsNotEmpty()
  @IsString()
  stop: string;

  @IsNotEmpty()
  @IsDate()
  time: Date;
}
