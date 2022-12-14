import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountReporitory: Repository<Account>,
  ) {}

  async getAccountByEmail(email: string): Promise<Account | undefined> {
    return await this.accountReporitory.findOne({
      where: { email },
      relations: { user: true },
    });
  }
}
