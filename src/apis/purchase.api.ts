import { Purchase, PurchaseListStatus } from '../types/purchase.type'
import { SuccessResponse } from '../types/utils.type'
import http from '../utils/http'

const URL = 'purchases'

export const purchaseApi = {
  addToCart(body: { product_id: string; buy_count: number }) {
    return http.post<SuccessResponse<Purchase>>(`${URL}/add-to-cart`, body)
  },
  getPurchases(params: { status: PurchaseListStatus }) {
    return http.get<SuccessResponse<Purchase[]>>(`${URL}`, {
      params
    })
  }
}