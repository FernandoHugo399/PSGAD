import { IAllCategory, IProduct } from './../../services/global/global.model';
import { Observable } from 'rxjs';
import { IRequest } from 'src/app/services/global/global.model';

export interface IAddProdutoService{
  readURL: (archive: Event , preImage: HTMLImageElement, product: IProduct) => void;
  clearPreview: (img: HTMLImageElement, inp: HTMLInputElement,  product: IProduct) => void;
  getCategorias: ()=> Observable<IAllCategory>;
  createProduct: (product: IProduct)=> Observable<IRequest>;
}

