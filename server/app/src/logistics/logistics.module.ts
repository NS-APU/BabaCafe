import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/account/entities/account.entity';
import { LogisticsController } from './logistics.controller';
import { LogisticsService } from './logistics.service';
import { LogisticsSettingForIntermediary } from './setting/intermediary/entities/setting.entity';
import { LogisticsSettingForLogistics } from './setting/logistics/entities/setting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LogisticsSettingForLogistics, LogisticsSettingForIntermediary, Account])],
  controllers: [LogisticsController],
  providers: [LogisticsService],
  exports: [LogisticsService],
})
export class LogisticsModule {}
