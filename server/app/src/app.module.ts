import { AppController } from './app.controller';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import * as dotenv from 'dotenv';
import { ProductModule } from './product/product.module';
import { ReservationModule } from './reservation/reservation.module';
import { ShopModule } from './shop/shop.module';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DBHOST,
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
      synchronize: false,
      logging: process.env.LOGGING === 'true',
    }),
    ConfigModule.forRoot({
      // envファイルを組み込むために使用
      isGlobal: true,
    }),
    AccountModule,
    ProductModule,
    ReservationModule,
    ShopModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
