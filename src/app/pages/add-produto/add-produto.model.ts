import { Observable } from 'rxjs';
export interface IAddProdutoService{
  readURL: (archive: Event , preImage: HTMLImageElement, product: IProduct) => void;
  clearPreview: (img: HTMLImageElement, inp: HTMLInputElement,  product: IProduct) => void;
  getCategorias: ()=> Observable<ICategoria>;
  createProduct: (product: IProduct)=> Observable<IRequest>;
}

export interface IProduct {
  nome?: string
  preco?: string
  categoria?: string
  descricao?: string
  file?: Blob
}

export interface IRequest{
  error?: string
  message?: string
  authError?: string
}

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
