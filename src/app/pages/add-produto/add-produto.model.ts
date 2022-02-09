import { Observable } from 'rxjs';
import { IAllCategory } from 'src/app/services/global/categories.model';
import { IRequest } from 'src/app/services/global/global.model';
import { IProduct } from 'src/app/services/global/products.model';

export interface IAddProdutoService{
  readURL: (archive: Event , preImage: HTMLImageElement, product: IProduct) => void;
  clearPreview: (img: HTMLImageElement, inp: HTMLInputElement,  product: IProduct) => void;
  getCategorias: ()=> Observable<IAllCategory>;
  createProduct: (product: IProduct)=> Observable<IRequest>;
}

