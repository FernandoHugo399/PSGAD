import GlobalVarsLogin  from 'src/app/pages/login/login.model';
import { IProcessLogin, ILogin, ILoginService } from './login.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements ILoginService {
  baseUrl =  GlobalVarsLogin.baseURL

  constructor(private http: HttpClient, private Router: Router) { }


  login(user: ILogin): Observable<IProcessLogin>{
    return this.http.post<IProcessLogin>(`${this.baseUrl}/auth/login`, user)
  }

  LoginSuccessful(res: IProcessLogin): void {
    localStorage.setItem('token', res.token)
    this.Router.navigate([''])
  }

  LoginFailed(res: IProcessLogin, user: ILogin): void {
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
