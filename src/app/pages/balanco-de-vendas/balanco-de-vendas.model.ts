
import { Observable } from 'rxjs';
import { IAllCompletedOrders, ICompletedOrders } from 'src/app/services/global/orders.model';

export interface ChartData {
  month: string
  monthCount: number
  total_value: number
  orders: ICompletedOrders[]
}


export interface IBalancoDeVendasService{
  createGraphic(): Observable<IAllCompletedOrders>
  valuesOfGraphic(order: IAllCompletedOrders): void
  previousAndCorrentMonthOrders(): void
  percentageOfOrders(porcentVendas: number, vendaTotaisMesAtual: number, vendaTotaisMesAnterior: number): void
  productWithMoreOrdersInMonth(): void
  percentageProductMoreSalesInMonth(produtoComMaisVendas: number, vendaTotaisMesAtual: number): void
}
