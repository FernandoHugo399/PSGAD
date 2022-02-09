export interface IProduct {
  nome: string
  preco: string
  categoria: string
  descricao: string
  file: Blob
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
