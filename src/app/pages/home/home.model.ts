export interface IOrders {
  length: number
  pedidos: {
    id_pedido: number,
    nome: string,
    data_pedido: Date,
    valor_total: number,
    status: string
  }[]
}

export interface IHomeService {

}
