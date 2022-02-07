import GlobalVars from '../../services/global/global.model'
import { IProcessLogin, ILoginService } from './login.model';
import { IUser } from "src/app/services/global/global.model";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements ILoginService {
  baseUrl =  GlobalVars.baseURL

  constructor(private http: HttpClient, private Router: Router) { }


  login(user: IUser): Observable<IProcessLogin>{
    return this.http.post<IProcessLogin>(`${this.baseUrl}/auth/login`, user)
  }

  LoginSuccessful(res: IProcessLogin): void {
    localStorage.setItem('token', res.token)
    this.Router.navigate([''])
  }

  LoginFailed(res: IProcessLogin, user: IUser): void {
    user.email = ''
    user.password = ''
  }

  showHidePass (btn: HTMLButtonElement, inp: HTMLInputElement): void{
    if ( inp.attributes["type"].value === 'password') {
      inp.setAttribute('type', 'text')
      btn.innerText = 'Ocultar'
    }else {
      inp.setAttribute('type', 'password')
      btn.innerText = 'Mostrar'
      }
  }
}
