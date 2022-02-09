import { Observable } from "rxjs";
import { IUser } from 'src/app/services/global/user.model';

export interface IProcessLogin{
  message: string
  token: string
  error: string
}

export interface ILoginService {
  login: (user: IUser) => Observable<IProcessLogin>;
  LoginSuccessful: (res: IProcessLogin) => void;
  LoginFailed: (res: IProcessLogin, user: IUser) => void;
  showHidePass: (btn: HTMLButtonElement, inp: HTMLInputElement) => void;
}
