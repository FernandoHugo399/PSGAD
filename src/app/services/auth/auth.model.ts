import { Observable } from "rxjs";

export interface IAuth{
  message?: string
  error?: string
  headers?: string
  status?: number
  ok?: boolean
  authError?: string
}

export interface IAuthService {
  verify: () => Observable<IAuth>;
}
