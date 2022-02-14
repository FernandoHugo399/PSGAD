import { IRequest } from './global.model';
export interface IProduct {
  name: string
  price: string
  category: string
  description: string
  file: Blob
}

export interface IAllValidProduct extends IRequest{
  length: number
  products:{
    id_product: number
    name: string
    price: number
    description: string
    category: string
    image: string
  }[]
}
