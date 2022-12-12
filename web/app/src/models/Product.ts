import type { TProduct as BaseTProduct } from "./../../../../server/app/src/product/entities/product.entity";
import type { Jsonify } from "type-fest";
import { baseAPI } from "../api/base";
import { ShowableError } from "./Error";

export type TProduct = Jsonify<BaseTProduct>;
export class ProductRepository {
  get baseEndpoint(): string {
    return "products";
  }

  async all(): Promise<TProduct[]> {
    try {
      return await baseAPI<TProduct[]>({ endpoint: `${this.baseEndpoint}` });
    } catch (err) {
      throw new ShowableError(
        "商品の取得に失敗しました。時間をおいて再度試してください。"
      );
    }
  }

  async find(): Promise<TProduct> {
    try {
      return await baseAPI<TProduct>({ endpoint: `${this.baseEndpoint}` });
    } catch (err) {
      throw new ShowableError(
        "商品の取得に失敗しました。時間をおいて再度試してください。"
      );
    }
  }
}
