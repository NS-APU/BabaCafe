import { USER_STATUS } from 'src/user/entities/user.entity';

export interface JwtPayload {
  accountId: string;
  accountEmail: string;
  accountStatus: typeof USER_STATUS[keyof typeof USER_STATUS];
}
