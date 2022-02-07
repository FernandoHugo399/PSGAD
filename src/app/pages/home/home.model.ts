
import { Observable } from 'rxjs';
import { IPendingOrders } from 'src/app/services/global/global.model';

export interface IHomeService {
  pendingOrders: ()=> Observable<IPendingOrders>
}
