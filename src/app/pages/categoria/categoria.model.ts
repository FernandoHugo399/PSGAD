import { Observable } from 'rxjs';

export interface ICategoria{
  length: string
  categories:{
    id_categoria: number
    nome: string
  }[]
  error: string
  message: string
  authError?: string
}

export interface IRequest{
  error?: string
  message?: string
  authError?: string
}

export interface ICategoriaService{
  getCategory: ()=> Observable<ICategoria>;
  createCategory: (nome: string)=> Observable<IRequest>;
  deleteCategory: (id: number)=> Observable<IRequest>
}
