import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsString()
  saleStartDate: string;

  @IsNumber()
  price: number;

  @IsNumber()
  unitWeight: number;

  @IsNumber()
  totalAmount: number;
}
