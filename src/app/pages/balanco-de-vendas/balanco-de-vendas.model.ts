
import { Observable } from 'rxjs';
import { ICompletedOrders } from 'src/app/services/global/orders.model';

export interface ChartData{
  mes: string
  mesCount: number
  valorTotal: number
  vendas: {
    id_pedido: number
    nome_cliente: string
    valor_total_pedido: number
    produto: string
    preco_unitario: number
    quantidade: number
    data_pedido: string
  }[]
}


export interface IBalancoDeVendasService{
  createGraphic(): Observable<ICompletedOrders>
  valuesOfGraphic(order: ICompletedOrders): void
  previousAndCorrentMonthOrders(): void
  percentageOfOrders(porcentVendas: number, vendaTotaisMesAtual: number, vendaTotaisMesAnterior: number): void
  productWithMoreOrdersInMonth(): void
  percentageProductMoreSalesInMonth(produtoComMaisVendas: number, vendaTotaisMesAtual: number): void
}
