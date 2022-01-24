
import { Observable } from 'rxjs';
export interface IOrders {
  length: number
  pedidos: {
    id_pedido: number,
    nome: string,
    data_pedido: string,
    valor_total: number,
    status: string,
    formattedTime: string
  }[]
}

export interface IHomeService {
  pendingOrders: ()=> Observable<IOrders>
}
