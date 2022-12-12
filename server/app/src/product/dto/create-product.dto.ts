import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsString()
  saleStartDate: Date;

  @IsNumber()
  price: number;

  @IsNumber()
  unitWeight: number;

  @IsNumber()
  totalAmount: number;
}
