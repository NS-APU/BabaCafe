import { Body, Controller, Get, Put, Param, UseGuards, Query, Post, HttpCode, HttpStatus } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { Account } from 'src/account/entities/account.entity';
import { GetAccount } from 'src/account/get-account.decorator';
import { JwtAuthGuard } from 'src/account/jwt-auth.guard';
import { CreateLogisticsSettingForIntermediaryDto } from 'src/logistics/setting/intermediary/dto/create-setting.dto';
import { CreateLogisticsSettingForProducerDto } from 'src/logistics/setting/producer/dto/create-setting.dto';
import { LogisticsService } from './logistics.service';
import { CreateShippingScheduleDto } from './schedule/dto/create-shipping-scedule.entity';

@Controller('logistics')
@UseGuards(JwtAuthGuard)
export class LogisticsController {
  constructor(private readonly logisticService: LogisticsService) {}

  @Get('/setting/producer/:producerId')
  async getProducerSetting(@Param('producerId') producerId: string) {
    return this.logisticService.getProducerSetting(producerId);
  }

  @Get('/setting/logistics/:logisticsId')
  async getLogisticsSetting(@Param('logisticsId') logisticsId: string) {
    return this.logisticService.getLogisticsSetting(logisticsId);
  }

  @Get('/setting/intermediary/:intermediaryId')
  async getIntermediarySetting(@Param('intermediaryId') intermediaryId: string) {
    return this.logisticService.getIntermediarySetting(intermediaryId);
  }

  @Put('/setting/producer/:producerId')
  async updateProducerSetting(
    @Param('producerId') producerId: string,
    @Body() dto: CreateLogisticsSettingForProducerDto,
    @GetAccount() account: Account,
  ) {
    return this.logisticService.updateProducerSetting(account, producerId, dto);
  }

  @Put('/setting/intermediary/:intermediaryId')
  async updateIntermediarySetting(
    @Param('intermediaryId') intermediaryId: string,
    @Body() dto: CreateLogisticsSettingForIntermediaryDto,
    @GetAccount() account: Account,
  ) {
    return this.logisticService.updateIntermediarySetting(account, intermediaryId, dto);
  }

  @Post('/schedule')
  @HttpCode(HttpStatus.CREATED)
  async createShippingSchedule(@Body() dto: CreateShippingScheduleDto) {
    return this.logisticService.createShippingSchedule(dto);
  }

  @Get('/tripsuggestions')
  async getTripSuggestions(
    @Query('logisticsId') logisticsId: string,
    @Query('pickup-stop') pickupStop: string,
    @Query('delivery-stop') deliveryStop: string,
    @Query('count') count: number,
    @Query('date') date: string,
  ) {
    return await this.logisticService.getTripSuggestions(
      logisticsId,
      pickupStop,
      deliveryStop,
      count,
      dayjs(date).toDate(),
    );
  }
}
