import { Observable } from "rxjs";

export interface ILogin {
  email: string,
  password: string,
}

export interface IProcessLogin{
  message: string
  token: string
  error: string
}

export interface ILoginService {
  login: (user: ILogin) => Observable<IProcessLogin>;
  LoginSuccessful: (res: IProcessLogin) => void;
  LoginFailed: (res: IProcessLogin, user: ILogin) => void;
  showHidePass: (btn: HTMLButtonElement, inp: HTMLInputElement) => void;
}
