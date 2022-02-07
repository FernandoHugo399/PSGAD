import { IRequest } from './../global/global.model';
import { Observable } from "rxjs";

export interface IAuthService {
  verify: () => Observable<IRequest>;
}
