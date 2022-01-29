import { Observable } from 'rxjs';

export interface ICategoria{
  length: string
  categories:{
    id_categoria: number
    nome: string
  }[]
  error: string
  message: string
}

export interface IRequest{
  error?: string
  message?: string
}

export interface ICategoriaService{
  getCategorias: ()=> Observable<ICategoria>;
  createCategoria: ()=> Observable<IRequest>;
}
