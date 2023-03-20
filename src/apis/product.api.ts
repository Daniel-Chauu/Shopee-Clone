import { SuccessResponse } from "../types/utils.type";
import http from "../utils/http";
import {
  ProductListConfig,
  ProductList,
  Product,
} from "./../types/product.type";
const URL = "products";
export const productApi = {
  getProductList(params: ProductListConfig) {
    return http.get<SuccessResponse<ProductList>>(URL, {
      params,
    });
  },
  getProductDetail(id: string) {
    return http.get<SuccessResponse<Product>>(`${URL}/${id}`);
  },
};
