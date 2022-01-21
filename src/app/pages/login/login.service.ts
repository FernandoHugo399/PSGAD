import { IProcessLogin, ILogin, ILoginService } from './login.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements ILoginService {
  baseUrl = 'http://localhost:3333/auth'

  constructor(private http: HttpClient, private Router: Router) { }


  login(user: ILogin): Observable<IProcessLogin>{
    return this.http.post<IProcessLogin>(`${this.baseUrl}/login`, user)
  }

  LoginSuccessful(res: IProcessLogin): void {
    localStorage.setItem('tokenPSGAD', res.token)
    this.Router.navigate([''])
  }


  LoginFailed(res: IProcessLogin, user: ILogin): void {
    user.email = ''
    user.password = ''
  }
}
