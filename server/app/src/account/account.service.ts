import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository, IsNull, FindOptionsWhere } from 'typeorm';
import {
  LogisticsSettingForIntermediary,
  INTERMEDIARY_DEFAULT_STOP,
} from '../logistics/setting/intermediary/entities/setting.entity';
import { LogisticsSettingForLogistics, DELIVERY_TYPE } from '../logistics/setting/logistics/entities/setting.entity';
import {
  LogisticsSettingForProducer,
  PRODUCER_DEFAULT_STOP,
} from '../logistics/setting/producer/entities/setting.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account, USER_ATTRIBUTE } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    @InjectRepository(LogisticsSettingForProducer)
    private logisticsSettingForProducerRepository: Repository<LogisticsSettingForProducer>,
    @InjectRepository(LogisticsSettingForLogistics)
    private logisticsSettingForLogisticsRepository: Repository<LogisticsSettingForLogistics>,
    @InjectRepository(LogisticsSettingForIntermediary)
    private logisticsSettingForIntermediaryRepository: Repository<LogisticsSettingForIntermediary>,
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
      const account: Account = await this.accountRepository.save(createAccountDto);
      await this.setupLogisticsSetting(account);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
    return;
  }

  async setupLogisticsSetting(account: Account) {
    const id = account.id;
    const attribute = account.attribute;
    switch (attribute) {
      case USER_ATTRIBUTE.producer:
        await this.logisticsSettingForProducerRepository.save({
          producerId: id,
          stop: PRODUCER_DEFAULT_STOP,
        });
        break;
      case USER_ATTRIBUTE.logistics:
        await this.logisticsSettingForLogisticsRepository.save({
          logisticsId: id,
          deliveryType: DELIVERY_TYPE.direct,
        });
        break;
      case USER_ATTRIBUTE.intermediary:
        await this.logisticsSettingForIntermediaryRepository.save({
          intermediaryId: id,
          stop: INTERMEDIARY_DEFAULT_STOP,
        });
        break;
    }
  }

  async getShops(): Promise<Account[] | undefined> {
    return await this.accountRepository.find({
      where: { attribute: USER_ATTRIBUTE.intermediary, deletedAt: IsNull() },
    });
  }

  async getLogistics(deliveryType: string): Promise<Account[] | undefined> {
    let where: FindOptionsWhere<Account> = { attribute: USER_ATTRIBUTE.logistics, deletedAt: IsNull() };
    if (deliveryType && DELIVERY_TYPE[deliveryType]) {
      where = {
        ...where,
        logisticsSettingForLogistics: {
          deliveryType: DELIVERY_TYPE[deliveryType],
        },
      };
    }
    return await this.accountRepository.find({
      where,
      relations: { logisticsSettingForLogistics: true },
    });
  }
}
