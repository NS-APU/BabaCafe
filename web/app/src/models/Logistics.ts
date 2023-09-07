import { baseAPI } from '../api/base';
import type { TSuggestTrip as SuggestTrip } from './../../../../server/app/src/logistics/logistics.service';
import type { CreateLogisticsSettingForIntermediaryDto } from './../../../../server/app/src/logistics/setting/intermediary/dto/create-setting.dto';
import type { TLogisticsSettingForIntermediary } from './../../../../server/app/src/logistics/setting/intermediary/entities/setting.entity';
import type { CreateRouteDto } from './../../../../server/app/src/logistics/setting/logistics/dto/create-route.dto';
import type { UpdateDeliveryTypeDto } from './../../../../server/app/src/logistics/setting/logistics/dto/update-delivery-type.dto';
import type { TRoute } from './../../../../server/app/src/logistics/setting/logistics/entities/route.entity';
import type { TLogisticsSettingForLogistics } from './../../../../server/app/src/logistics/setting/logistics/entities/setting.entity';
import type { TTrip } from './../../../../server/app/src/logistics/setting/logistics/entities/trip.entity';
import type { CreateConsolidationDefinitionDto } from './../../../../server/app/src/logistics/setting/producer/dto/create-consolidation-define.dto';
import type { CreateLogisticsSettingForProducerDto } from './../../../../server/app/src/logistics/setting/producer/dto/create-setting.dto';
import type { TLogisticsSettingForProducer } from './../../../../server/app/src/logistics/setting/producer/entities/setting.entity';
import type { UpdateRouteDto } from '../../../../server/app/src/logistics/setting/logistics/dto/update-route.dto';
import type { UserConsolidationDefine } from '../../../../server/app/src/logistics/setting/producer/entities/consolidation-define.entity';
import type { Jsonify } from 'type-fest';

export type TProducerSetting = Jsonify<TLogisticsSettingForProducer>;
export type TLogisticsSetting = Jsonify<TLogisticsSettingForLogistics>;
export type TRouteSetting = Jsonify<TRoute>;
export type TTripSetting = Jsonify<TTrip>;
export type TIntermediarySetting = Jsonify<TLogisticsSettingForIntermediary>;
export type TProducerSettingForm = Jsonify<CreateLogisticsSettingForProducerDto>;
export type TIntermediarySettingForm = Jsonify<CreateLogisticsSettingForIntermediaryDto>;
export type TRouteForm = Jsonify<CreateRouteDto>;
export type TUpdateRouteForm = Jsonify<UpdateRouteDto>;
export type TDeliveryTypeForm = Jsonify<UpdateDeliveryTypeDto>;
export type TConsolidationDefinitionForm = Jsonify<CreateConsolidationDefinitionDto>;
export type TUserConsolidationDefine = Jsonify<UserConsolidationDefine>;

export const DELIVERY_TYPE = {
  route: 'route',
  direct: 'direct',
} as const;
export type TSuggestTrip = Jsonify<SuggestTrip>;

export class LogisticsRepository {
  get baseEndpoint(): string {
    return 'logistics';
  }

  async getProducerSetting(id: string): Promise<TProducerSetting> {
    return await baseAPI<TProducerSetting>({
      endpoint: `${this.baseEndpoint}/setting/producer/${id}`,
    });
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

  async updateProducerSetting(id: string, body: TProducerSettingForm): Promise<TProducerSetting> {
    return await baseAPI<TProducerSetting>({
      endpoint: `${this.baseEndpoint}/setting/producer/${id}`,
      method: 'PUT',
      body,
    });
  }

  async updateIntermediarySetting(id: string, body: TIntermediarySettingForm): Promise<TIntermediarySetting> {
    return await baseAPI<TIntermediarySetting>({
      endpoint: `${this.baseEndpoint}/setting/intermediary/${id}`,
      method: 'PUT',
      body,
    });
  }

  async createRoute(logisticsId: string, body: TRouteForm): Promise<TLogisticsSetting> {
    return await baseAPI<TLogisticsSetting>({
      endpoint: `${this.baseEndpoint}/setting/logistics/${logisticsId}/route`,
      method: 'POST',
      body,
    });
  }

  async deleteRoute(logisticsSettingId: string, routeId: string): Promise<TLogisticsSetting> {
    return await baseAPI<TLogisticsSetting>({
      endpoint: `${this.baseEndpoint}/setting/logistics/${logisticsSettingId}/route/${routeId}`,
      method: 'DELETE',
    });
  }

  async updateDeliveryType(logisticsId: string, body: TDeliveryTypeForm): Promise<TLogisticsSetting> {
    return await baseAPI<TLogisticsSetting>({
      endpoint: `${this.baseEndpoint}/setting/logistics/${logisticsId}/deliveryType`,
      method: 'PUT',
      body,
    });
  }

  async getTripSuggestions(
    logisticsId: string,
    pickupStop: string,
    deliveryStop: string,
    count: number,
  ): Promise<Record<string, string>[]> {
    return await baseAPI<Record<string, string>[]>({
      endpoint: `${this.baseEndpoint}/tripsuggestions?logisticsId=${logisticsId}&pickup-stop=${pickupStop}&delivery-stop=${deliveryStop}&count=${count}`,
    });
  }

  async deleteTrip(logisticsSettingId: string, routeId: string, tripId: string): Promise<TLogisticsSetting> {
    return await baseAPI<TLogisticsSetting>({
      endpoint: `${this.baseEndpoint}/setting/logistics/${logisticsSettingId}/route/${routeId}/trip/${tripId}`,
      method: 'DELETE',
    });
  }

  async createConsolidationDefinition(body: TConsolidationDefinitionForm): Promise<TProducerSetting> {
    return await baseAPI<TProducerSetting>({
      endpoint: `${this.baseEndpoint}/setting/producer/consolidation-definition`,
      method: 'POST',
      body,
    });
  }

  async updateConsolidationDefinition(id: string, body: TConsolidationDefinitionForm): Promise<TProducerSetting> {
    return await baseAPI<TProducerSetting>({
      endpoint: `${this.baseEndpoint}/setting/producer/consolidation-definition/${id}`,
      method: 'PUT',
      body,
    });
  }

  async deleteConsolidationDefinition(id: string): Promise<TProducerSetting> {
    return await baseAPI<TProducerSetting>({
      endpoint: `${this.baseEndpoint}/setting/producer/consolidation-definition/${id}`,
      method: 'DELETE',
    });
  }

  async getSystemConsolidationDefinitions(): Promise<Record<string, string>[]> {
    return await baseAPI<Record<string, string>[]>({
      endpoint: `${this.baseEndpoint}/setting/system/consolidation-definition`,
    });
  }

  async updateRoute(logisticsId: string, routeId: string, body: TUpdateRouteForm): Promise<TLogisticsSetting> {
    return await baseAPI<TLogisticsSetting>({
      endpoint: `${this.baseEndpoint}/setting/logistics/${logisticsId}/route/${routeId}`,
      method: 'PUT',
      body,
    });
  }
}
