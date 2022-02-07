export default class GlobalVars {
  public static asMessageError: string
  public static asMessageSuccess: string
  public static baseURL: string = 'http://localhost:3333'
}

export interface IRequest{
  error: string
  message: string
  authError: string
}


export interface IUser {
  email: string,
  password: string,
}

export interface IProduct {
  nome?: string
  preco?: string
  categoria?: string
  descricao?: string
  file?: Blob
}


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

export interface IAllCategory{
  length: string
  categories:{
    id_categoria: number
    nome: string
  }[]
  error: string
  message: string
  authError?: string
}


export interface IAllValidProduct{
  length?: number
  products?:{
    id_produto: number
    nome: string
    preco: number
    descricao: string
    categoria: string
    image: string
  }[]
  error?: string
  message?: string
  authError?: string
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
