import { baseAPI } from '../api/base';
import type { CreateLogisticsSettingForIntermediaryDto } from './../../../../server/app/src/logistics/setting/intermediary/dto/create-setting.dto';
import type { TLogisticsSettingForIntermediary } from './../../../../server/app/src/logistics/setting/intermediary/entities/setting.entity';
import type { CreateRouteDto } from './../../../../server/app/src/logistics/setting/logistics/dto/create-route.dto';
import type { UpdateDeliveryTypeDto } from './../../../../server/app/src/logistics/setting/logistics/dto/update-delivery-type.dto';
import type { TLogisticsSettingForLogistics } from './../../../../server/app/src/logistics/setting/logistics/entities/setting.entity';
import type { Jsonify } from 'type-fest';

export type TLogisticsSetting = Jsonify<TLogisticsSettingForLogistics>;
export type TIntermediarySetting = Jsonify<TLogisticsSettingForIntermediary>;
export type TIntermediarySettingForm = Jsonify<CreateLogisticsSettingForIntermediaryDto>;
export type TRouteForm = Jsonify<CreateRouteDto>;
export type TDeliveryTypeForm = Jsonify<UpdateDeliveryTypeDto>;

export class LogisticsRepository {
  get baseEndpoint(): string {
    return 'logistics';
  }

  async getLogisticsSetting(id: string): Promise<TLogisticsSetting> {
    return await baseAPI<TLogisticsSetting>({
      endpoint: `${this.baseEndpoint}/setting/logistics/${id}`,
    });
  }

  async getIntermediarySetting(id: string): Promise<TIntermediarySetting> {
    return await baseAPI<TIntermediarySetting>({
      endpoint: `${this.baseEndpoint}/setting/intermediary/${id}`,
    });
  }

  async updateIntermediarySetting(id: string, body: TIntermediarySettingForm): Promise<TIntermediarySetting> {
    return await baseAPI<TIntermediarySetting>({
      endpoint: `${this.baseEndpoint}/setting/intermediary/${id}`,
      method: 'PUT',
      body,
    });
  }

  async createRoute(body: TRouteForm): Promise<TLogisticsSetting> {
    return await baseAPI<TLogisticsSetting>({
      endpoint: `${this.baseEndpoint}/setting/logistics/route`,
      method: 'POST',
      body,
    });
  }

  async updateDeliveryType(logisticsId: string, body: TDeliveryTypeForm): Promise<TLogisticsSetting> {
    return await baseAPI<TLogisticsSetting>({
      endpoint: `${this.baseEndpoint}/setting/logistics/${logisticsId}/deliveryType`,
      method: 'PUT',
      body,
    });
  }
}
