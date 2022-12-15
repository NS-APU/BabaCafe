import type { Jsonify } from "type-fest";
import { baseAPI } from "../api/base";
import type { TShop as BaseTShop } from "./../../../../server/app/src/shop/entities/shop.entity";
import { ShowableError } from "./Error";

export type TShop = Jsonify<BaseTShop>;

export class ShopRepository {
  get baseEndpoint(): string {
    return "shops";
  }

  async getShops(): Promise<TShop[]> {
    try {
      return await baseAPI<TShop[]>({
        endpoint: `${this.baseEndpoint}`,
      });
    } catch (err) {
      throw new ShowableError(
        "店舗の取得に失敗しました。時間をおいて再度試してください。"
      );
    }
  }
}
