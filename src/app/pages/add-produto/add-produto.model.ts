import { Observable } from 'rxjs';
export interface IAddProdutoService{
  readURL: (archive: any , preImage: HTMLImageElement) => void;
  clearPreview: (img: HTMLImageElement, inp: HTMLInputElement) => void;
  getCategorias: ()=> Observable<ICategoria>;
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
