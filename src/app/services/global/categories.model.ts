import { IRequest } from './global.model';
export interface IAllCategory extends IRequest{
  length: string
  categories:{
    idCategory: number
    name: string
  }[]
}
