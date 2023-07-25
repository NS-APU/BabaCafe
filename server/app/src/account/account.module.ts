import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogisticsSettingForIntermediary } from '../logistics/setting/intermediary/entities/setting.entity';
import { LogisticsSettingForLogistics } from '../logistics/setting/logistics/entities/setting.entity';
import { LogisticsSettingForProducer } from '../logistics/setting/producer/entities/setting.entity';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AuthService } from './auth.service';
import { Account } from './entities/account.entity';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    // JWTを使うための設定をしている
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          // envファイルから秘密鍵を渡す
          secret: configService.get<string>('JWT_SECRET_KEY'),
          signOptions: {
            // 有効期間を設定
            // 指定する値は以下を参照
            // https://github.com/vercel/ms
            expiresIn: '1h',
          },
        };
      },
      inject: [ConfigService], // useFactoryで使う為にConfigServiceを注入する
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([
      Account,
      LogisticsSettingForProducer,
      LogisticsSettingForLogistics,
      LogisticsSettingForIntermediary,
    ]),
  ],
  controllers: [AccountController],
  providers: [AuthService, AccountService, JwtStrategy, LocalStrategy],
})
export class AccountModule {}
