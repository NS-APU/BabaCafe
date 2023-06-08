import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { Account } from './entities/account.entity';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountReporitory: Repository<Account>,
  ) { }

  async getAccountByEmail(email: string): Promise<Account | undefined> {
    return await this.accountReporitory.findOne({
      where: { email, deletedAt: IsNull() },
    });
  }

  async signup(createAccountDto: CreateAccountDto) {
    if (await this.getAccountByEmail(createAccountDto.email)) {
      throw new ConflictException();
    }
    try {
      const salt = await bcrypt.genSalt()
      const hashPassword = await bcrypt.hash(createAccountDto.password, salt)
      createAccountDto.password = hashPassword;
      this.accountReporitory.save(createAccountDto);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
    return;
  }

}
