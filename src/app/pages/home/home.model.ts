
import { Observable } from 'rxjs';
import { IAllPendingOrders } from 'src/app/services/global/orders.model';


export interface IHomeService {
  pendingOrders: ()=> Observable<IAllPendingOrders>
}
