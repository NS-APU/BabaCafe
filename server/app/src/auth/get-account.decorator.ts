import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Account } from './entities/account.entity';

export const GetAccount = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Account => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
