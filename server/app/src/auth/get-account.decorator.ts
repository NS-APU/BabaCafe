import { PipeTransform } from '@nestjs/common';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { GetKeyValidationPipe } from 'src/common/get-key-validation.pipe';
import { DataSource } from 'typeorm';
import { Account } from './entities/account.entity';

export const GetAccount = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Account => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

// export class AccountValidationPipe implements PipeTransform {
//   constructor(@InjectDataSource() private readonly dataSource: DataSource) {}
//   async transform(hashId: string): Promise<Account> {
//     return await new GetKeyValidationPipe(this.dataSource).target({
//       entity: new Account(),
//       value: hashId,
//     })
//   }
// }
