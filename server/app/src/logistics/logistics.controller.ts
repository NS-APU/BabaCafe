import { Body, Controller, Get, Put, Param, UseGuards, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { Account } from 'src/account/entities/account.entity';
import { GetAccount } from 'src/account/get-account.decorator';
import { JwtAuthGuard } from 'src/account/jwt-auth.guard';
import { CreateLogisticsSettingForIntermediaryDto } from 'src/logistics/setting/intermediary/dto/create-setting.dto';
import { CreateLogisticsSettingForProducerDto } from 'src/logistics/setting/producer/dto/create-setting.dto';
import { LogisticsService } from './logistics.service';
import { CreateRouteDto } from './setting/logistics/dto/create-route.dto';
import { CreateTripDto } from './setting/logistics/dto/create-trip.dto';
import { UpdateDeliveryTypeDto } from './setting/logistics/dto/update-delivery-type.dto';

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

  @Post('/setting/logistics/route')
  @HttpCode(HttpStatus.CREATED)
  async createRoute(@Body() dto: CreateRouteDto) {
    return this.logisticService.createRoute(dto);
  }

  @Post('/setting/logistics/trip')
  @HttpCode(HttpStatus.CREATED)
  async createTrip(@Body() dto: CreateTripDto, @GetAccount() account: Account) {
    return this.logisticService.createTrip(account, dto);
  }

  @Put('/setting/logistics/:logisticsId/deliveryType')
  async updateDeliveryType(@Param('logisticsId') logisticsId: string, @Body() dto: UpdateDeliveryTypeDto) {
    return this.logisticService.updateDeliveryType(logisticsId, dto);
  }
}
