import { Observable } from 'rxjs';
import { IAllValidProduct } from 'src/app/services/global/global.model';

export interface ICatalogoService{
  allProducts: ()=> Observable<IAllValidProduct>
}
