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
  getCategorias: ()=> Observable<ICategoria>;
  createCategoria: (nome: string)=> Observable<IRequest>;
  deleteCategoria: (id: number)=> Observable<IRequest>
}
