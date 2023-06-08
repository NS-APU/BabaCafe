import type { Jsonify } from "type-fest";
import { baseAPI } from "../api/base";
import type { TShop as BaseTShop } from "./../../../../server/app/src/shop/entities/shop.entity";

export type TShop = Jsonify<BaseTShop>;

export class ShopRepository {
  get baseEndpoint(): string {
    return "shops";
  }

  async getShops(): Promise<TShop[]> {
    return await baseAPI<TShop[]>({
      endpoint: `${this.baseEndpoint}`,
    });
  }
}
