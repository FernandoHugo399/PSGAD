export interface ChartData{
  mes: string
  mesCount: number
  valorTotal: number
  vendas: OrderPedido[]
}

export interface OrderPedido{
  id_pedido: number
  nome_cliente: string
  valor_total_pedido: number
  produto: string
  preco_unitario: number
  quantidade: number
  data_pedido: string
}
