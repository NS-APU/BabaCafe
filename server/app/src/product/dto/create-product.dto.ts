import { IsOptional, IsNotEmpty, IsString, IsInt, IsEnum, IsDateString } from 'class-validator';
import { CROP_KINDS, CROP_UNITS } from '../entities/product.entity';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(CROP_KINDS)
  kinds: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  startAt: string;

  @IsNotEmpty()
  @IsDateString()
  endAt: string;

  @IsNotEmpty()
  @IsEnum(CROP_UNITS)
  unit: string;

  @IsNotEmpty()
  @IsInt()
  unitQuantity: number;

  @IsNotEmpty()
  @IsInt()
  unitPrice: number;

  @IsOptional()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsInt()
  quantity: number;

  @IsNotEmpty()
  @IsInt()
  shockLevel: number;
}
