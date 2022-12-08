import bcrypt = require('bcrypt');
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/auth/account.service';
import { Account } from 'src/auth/entities/account.entity';

type PasswordOmitAccount = Omit<Account, 'password'>;

interface JWTPayload {
  accountId: Account['id'];
  accountEmail: Account['email'];
}

/**
 * @description Passportでは出来ない認証処理をするクラス
 */
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private accountService: AccountService,
  ) {}

  // ユーザーを認証する
  async validateAccount(
    email: Account['email'],
    pass: Account['password'],
  ): Promise<PasswordOmitAccount | null> {
    const account = await this.accountService.getAccountByEmail(email); // DBからAccountを取得

    // DBに保存されているpasswordはハッシュ化されている事を想定しているので、
    // bcryptなどを使ってパスワードを判定する
    if (account && bcrypt.compareSync(pass, account.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = account; // パスワード情報を外部に出さないようにする

      return result as Account;
    }

    return null;
  }

  // jwt tokenを返す
  async login(account: PasswordOmitAccount) {
    // jwtにつけるPayload情報
    const payload: JWTPayload = {
      accountId: account.id,
      accountEmail: account.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
