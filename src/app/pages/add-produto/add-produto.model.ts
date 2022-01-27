import { Observable } from 'rxjs';
export interface IAddProdutoService{
  readURL: (archive: any , preImage: HTMLImageElement) => void;
  clearPreview: (img: HTMLImageElement, inp: HTMLInputElement) => void;
  getCategorias: ()=> Observable<ICategoria>;
  createProduct: (product: IProduct)=> Observable<IRequest>;
}

export interface IProduct {
  nome?: string
  preco?: string
  categoria?: string
  descricao?: string
  file?: ArrayBuffer
}

export interface IRequest{
  error?: string
  message?: string
}

export interface ICategoria{
  length: string
  categories:{
    id_categoria: number
    nome: string
  }[]
  error: string
  message: string
}
