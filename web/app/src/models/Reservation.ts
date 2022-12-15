import { ShowableError } from "./Error";
import type { TReservationProduct as BaseTReservationProduct } from "./../../../../server/app/src/reservation/entities/reservation.entity";
import type { TReservation as BaseTReservation } from "./../../../../server/app/src/reservation/entities/reservation.entity";
import type { CreateReservationDto } from "./../../../../server/app/src/reservation/dto/create-reservation.dto";
import type { Jsonify } from "type-fest";
import { baseAPI } from "../api/base";

export type TReservationProduct = Jsonify<BaseTReservationProduct>;
export type TReservation = Jsonify<BaseTReservation>;
export type TReservationForm = Jsonify<CreateReservationDto>;

export const statusToText: Record<TReservation["status"], string> = {
  onSale: "販売中",
  cancel: "取り消し",
  accepting: "受付中",
  shipping: "出荷中",
  complete: "受け取り完了",
};

export const RESERVATION_STATUS = {
  ACCEPTING: "accepting",
  CANCEL: "cancel",
  SHIPPING: "shipping",
  ON_SALE: "onSale",
  COMPLETE: "complete",
} as const;

export class ReservationRepository {
  get baseEndpoint(): string {
    return "reservations";
  }

  async allReservationProducts(): Promise<TReservationProduct[]> {
    try {
      return await baseAPI<TReservationProduct[]>({
        endpoint: `${this.baseEndpoint}/products`,
      });
    } catch (err) {
      throw new ShowableError(
        "商品の取得に失敗しました。時間をおいて再度試してください。"
      );
    }
  }

  async findOne(id: string): Promise<TReservationProduct> {
    try {
      return await baseAPI<TReservationProduct>({
        endpoint: `${this.baseEndpoint}/products/${id}`,
      });
    } catch (err) {
      throw new ShowableError(
        "商品の取得に失敗しました。時間をおいて再度試してください。"
      );
    }
  }

  async create(body: TReservationForm): Promise<TReservation> {
    try {
      return await baseAPI<TReservation>({
        endpoint: `${this.baseEndpoint}`,
        method: "POST",
        body,
      });
    } catch {
      throw new ShowableError("保存に失敗しました。");
    }
  }
}
