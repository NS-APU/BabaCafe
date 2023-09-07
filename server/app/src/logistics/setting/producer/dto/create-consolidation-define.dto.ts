import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateConsolidationDefinitionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  shockLevel: number;
}
