import { USER_CLASSIFICATION, USER_ATTRIBUTE } from 'src/account/entities/account.entity';

export interface JwtPayload {
  id: string;
  email: string;
  classification: typeof USER_CLASSIFICATION[keyof typeof USER_CLASSIFICATION];
  attribute: typeof USER_ATTRIBUTE[keyof typeof USER_ATTRIBUTE];
  name: string;
}
