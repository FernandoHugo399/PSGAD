import { Observable } from 'rxjs';
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

export interface OrderPedido{
  length: number
  pedidos: {
    id_pedido: number
    nome_cliente: string
    valor_total_pedido: number
    produto: string
    preco_unitario: number
    quantidade: number
    data_pedido: string
  }[]
  authError: string
  error: string
  message: string
}


export interface IBalancoDeVendasService{
  createGraphic(): Observable<OrderPedido>
  valuesOfGraphic(order: OrderPedido): void
  previousAndCorrentMonthOrders(): void
  percentageOfOrders(porcentVendas: number, vendaTotaisMesAtual: number, vendaTotaisMesAnterior: number): void
  productWithMoreOrdersInMonth(): void
  percentageProductMoreSalesInMonth(produtoComMaisVendas: number, vendaTotaisMesAtual: number): void
}
