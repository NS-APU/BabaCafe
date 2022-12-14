import { ExtractJwt, Strategy as BaseJwtStrategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from './jwt-payload-interface';
import { Account } from 'src/auth/entities/account.entity';
import { USER_STATUS } from 'src/user/entities/user.entity';

// JwtについているPayload情報の型
interface JWTPayload {
  accountId: Account['hashId'];
  accountEmail: Account['email'];
  accountStatus: typeof USER_STATUS[keyof typeof USER_STATUS];
}

/**
 * @description JWTの認証処理を行うクラス
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(BaseJwtStrategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      // Authorization bearerからトークンを読み込む関数を返す
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 有効期間を無視するかどうか
      ignoreExpiration: false,
      // envファイルから秘密鍵を渡す
      secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
    });
  }

  // ここでPayloadを使ったバリデーション処理を実行できる
  // Payloadは、AuthService.login()で定義した値
  async validate(payload: JWTPayload): Promise<JwtPayload> {
    return {
      accountId: payload.accountId,
      accountEmail: payload.accountEmail,
      accountStatus: payload.accountStatus,
    };
  }
}
