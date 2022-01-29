import { Observable } from 'rxjs';
export interface Product{
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

export interface ICatalogoService{
  allProducts: ()=> Observable<Product>
}
