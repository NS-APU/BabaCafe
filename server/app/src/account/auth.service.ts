import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { AccountService } from 'src/account/account.service';
import { Account } from 'src/account/entities/account.entity';
import { JwtPayload } from './jwt-payload-interface';

export type PasswordOmitAccount = Omit<Account, 'password'>;

/**
 * @description Passportでは出来ない認証処理をするクラス
 */
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private accountService: AccountService,
  ) { }

  // ユーザーを認証する
  async validateAccount(
    email: Account['email'],
    pass: Account['password'],
  ): Promise<PasswordOmitAccount | null> {
    const account = await this.accountService.getAccountByEmail(email); // DBからAccountを取得

    if (account && (await bcrypt.compare(pass, account.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = account; // パスワード情報を外部に出さないようにする

      return result as PasswordOmitAccount;
    }

    return null;
  }

  // jwt tokenを返す
  async login(account: PasswordOmitAccount) {
    // jwtにつけるPayload情報
    const payload: JwtPayload = {
      id: account.id,
      email: account.email,
      classification: account.classification,
      attribute: account.attribute,
      name: account.name
    };

    return {
      access_token: this.jwtService.sign(payload),
      id: payload.id,
      email: payload.email,
      classification: payload.classification,
      attribute: payload.attribute,
      name: payload.name
    };
  }
}
