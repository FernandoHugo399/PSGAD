export interface IPendingOrders {
  length: number
  pedidos: {
    id_pedido: number,
    nome: string,
    data_pedido: string,
    valor_total: number,
    status: string,
    formattedTime: string
  }[],
  error: string
  message: string
  authError: string
}


export interface ICompletedOrders{
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
