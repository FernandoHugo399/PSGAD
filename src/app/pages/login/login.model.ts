import { Observable } from "rxjs";

export interface ILogin {
  email: string,
  password: string,
}

export interface IProcessLogin{
  message?: string
  token?: string
  headers?: string
  status?: number
  ok?: boolean
  error?: string
  statusText?: string
}

export interface ILoginService {
  login: (user: ILogin) => Observable<IProcessLogin>;
  LoginSuccessful: (res: IProcessLogin) => void;
  LoginFailed: (res: IProcessLogin, user: ILogin) => void;
  showHidePass: (btn: HTMLButtonElement, inp: HTMLInputElement) => void;
}

export default class GlobalVarsLogin {
  public static asMessageError: string
}
