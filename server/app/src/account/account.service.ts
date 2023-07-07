import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository, IsNull } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account, USER_ATTRIBUTE } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async getAccountByEmail(email: string): Promise<Account | undefined> {
    return await this.accountRepository.findOne({
      where: { email, deletedAt: IsNull() },
    });
  }

  async signup(createAccountDto: CreateAccountDto) {
    if (await this.getAccountByEmail(createAccountDto.email)) {
      throw new ConflictException();
    }
    try {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(createAccountDto.password, salt);
      createAccountDto.password = hashPassword;
      this.accountRepository.save(createAccountDto);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
    return;
  }

  async getShops(): Promise<Account[] | undefined> {
    return await this.accountRepository.find({
      where: { attribute: USER_ATTRIBUTE.intermediary, deletedAt: IsNull() },
    });
  }

  async getLogistics(): Promise<Account[] | undefined> {
    return await this.accountRepository.find({
      where: { attribute: USER_ATTRIBUTE.logistics, deletedAt: IsNull() },
    });
  }
}
