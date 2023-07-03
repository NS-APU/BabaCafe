import type { TProduct as BaseTProduct } from "./../../../../server/app/src/product/entities/product.entity";
import type { CreateProductDto } from "./../../../../server/app/src/product/dto/create-product.dto";
import type { Jsonify } from "type-fest";
import { baseAPI } from "../api/base";

export type TProduct = Jsonify<BaseTProduct>;
export type TProductForm = Jsonify<CreateProductDto>;

export class ProductRepository {
  get baseEndpoint(): string {
    return "products";
  }

  async all(): Promise<TProduct[]> {
    return await baseAPI<TProduct[]>({ endpoint: `${this.baseEndpoint}` });
  }

  async findOne(id: string): Promise<TProduct> {
    return await baseAPI<TProduct>({
      endpoint: `${this.baseEndpoint}/${id}`,
    });
  }

  async create(body: TProductForm): Promise<TProduct> {
    return await baseAPI<TProduct>({
      endpoint: `${this.baseEndpoint}`,
      method: "POST",
      body,
    });
  }

  async update(id: string, body: TProductForm): Promise<TProduct> {
    return await baseAPI<TProduct>({
      endpoint: `${this.baseEndpoint}/${id}`,
      method: "PATCH",
      body,
    });
  }
}
