import { Observable } from 'rxjs';
import { IAllValidProduct } from 'src/app/services/global/products.model';


export interface ICatalogoService{
  allProducts: ()=> Observable<IAllValidProduct>
}
