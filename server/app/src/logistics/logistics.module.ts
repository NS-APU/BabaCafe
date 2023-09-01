import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/account/entities/account.entity';
import { LogisticsController } from './logistics.controller';
import { LogisticsService } from './logistics.service';
import { ShippingSchedule } from './schedule/entities/shipping-schedule.entity';
import { LogisticsSettingForIntermediary } from './setting/intermediary/entities/setting.entity';
import { LogisticsSettingForLogistics } from './setting/logistics/entities/setting.entity';
import { Trip } from './setting/logistics/entities/trip.entity';
import { LogisticsSettingForProducer } from './setting/producer/entities/setting.entity';
import { SystemConsolidationDefine } from './setting/system/entities/consolidation-define.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LogisticsSettingForProducer,
      LogisticsSettingForLogistics,
      LogisticsSettingForIntermediary,
      Account,
      Trip,
      ShippingSchedule,
      SystemConsolidationDefine,
    ]),
  ],
  controllers: [LogisticsController],
  providers: [LogisticsService],
  exports: [LogisticsService],
})
export class LogisticsModule {}
