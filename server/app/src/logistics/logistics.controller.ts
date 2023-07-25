import { Body, Controller, Get, Put, Param, UseGuards } from '@nestjs/common';
import { Account } from 'src/account/entities/account.entity';
import { GetAccount } from 'src/account/get-account.decorator';
import { JwtAuthGuard } from 'src/account/jwt-auth.guard';
import { CreateLogisticsSettingForIntermediaryDto } from 'src/logistics/setting/intermediary/dto/create-setting.dto';
import { LogisticsService } from './logistics.service';

@Controller('logistics')
@UseGuards(JwtAuthGuard)
export class LogisticsController {
  constructor(private readonly logisticService: LogisticsService) {}

  @Get('/setting/logistics/:logisticsId')
  async getLogisticsSetting(@Param('logisticsId') logisticsId: string) {
    return this.logisticService.getLogisticsSetting(logisticsId);
  }

  @Get('/setting/intermediary/:intermediaryId')
  async getIntermediarySetting(@Param('intermediaryId') intermediaryId: string) {
    return this.logisticService.getIntermediarySetting(intermediaryId);
  }

  @Put('/setting/intermediary/:intermediaryId')
  async updateIntermediarySetting(
    @Param('intermediaryId') intermediaryId: string,
    @Body() dto: CreateLogisticsSettingForIntermediaryDto,
    @GetAccount() account: Account,
  ) {
    return this.logisticService.updateIntermediarySetting(account, intermediaryId, dto);
  }
}
