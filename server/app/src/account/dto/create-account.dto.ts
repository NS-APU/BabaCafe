import { IsString, IsEnum, IsNotEmpty, IsEmail, Matches } from 'class-validator';
import { USER_CLASSIFICATION, USER_ATTRIBUTE } from '../entities/account.entity';

export class CreateAccountDto {

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(USER_CLASSIFICATION)
  classification: typeof USER_CLASSIFICATION[keyof typeof USER_CLASSIFICATION];

  @IsNotEmpty()
  @IsEnum(USER_ATTRIBUTE)
  attribute: typeof USER_ATTRIBUTE[keyof typeof USER_ATTRIBUTE];

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Matches("\\d{2,4}-\\d{2,4}-\\d{3,4}")
  tel: string;

  @IsNotEmpty()
  @IsString()
  @Matches("^\\d{3}-\\d{4}$")
  zipCode: string;

  @IsNotEmpty()
  @IsString()
  address: string;

}
