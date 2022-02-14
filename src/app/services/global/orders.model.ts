import { IRequest } from './global.model';
export interface IAllPendingOrders extends IRequest {
  length: number
  orders: {
    id_order: number
    client_name: string
    order_date: string
    total_value: number
    status: string
    formattedTime: string
  }[]
}


export interface IAllCompletedOrders extends IRequest{
  length: number
  orders: {
    id_order: number
    client_name: string
    total_order: number
    product: string
    unit_price: number
    amount: number
    order_date: string
  }[]
}


export interface ICompletedOrders{
  id_order: number
  client_name: string
  total_order: number
  product: string
  unit_price: number
  amount: number
  order_date: string
}
