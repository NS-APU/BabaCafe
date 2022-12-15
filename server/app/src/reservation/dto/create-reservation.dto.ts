import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  shippingDate: string;

  @IsNumber()
  totalPrice: number;

  @IsString()
  status: string;

  @IsString()
  reservationDate: string;

  @IsArray()
  products: {
    productId: string;
    quantity: number;
  }[];

  @IsString()
  shopId: string;
}
