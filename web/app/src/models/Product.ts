import type { TProduct as BaseTProduct } from "./../../../../server/app/src/product/entities/product.entity";
import type { CreateProductDto } from "./../../../../server/app/src/product/dto/create-product.dto";
import type { Jsonify } from "type-fest";
import { baseAPI } from "../api/base";
import { ShowableError } from "./Error";

export type TProduct = Jsonify<BaseTProduct>;
export type TProductForm = Jsonify<CreateProductDto>;

export const PRODUCT_STATUS = {
  ON_SALE: "onSale", // 販売中
  SOLD_OUT: "soldOut", // 売り切れ
  WILL_SALE: "willSale", // 販売予定
  SALE_OUT: "saleOut", // 販売終了
};

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

  async findOne(id: string): Promise<TProduct> {
    try {
      return await baseAPI<TProduct>({
        endpoint: `${this.baseEndpoint}/${id}`,
      });
    } catch (err) {
      throw new ShowableError(
        "商品の取得に失敗しました。時間をおいて再度試してください。"
      );
    }
  }

  async create(body: TProductForm): Promise<TProduct> {
    try {
      return await baseAPI<TProduct>({
        endpoint: `${this.baseEndpoint}`,
        method: "POST",
        body,
      });
    } catch {
      throw new ShowableError("保存に失敗しました。");
    }
  }
}
