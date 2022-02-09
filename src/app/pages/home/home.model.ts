
import { Observable } from 'rxjs';
import { IPendingOrders } from 'src/app/services/global/orders.model';


export interface IHomeService {
  pendingOrders: ()=> Observable<IPendingOrders>
}
