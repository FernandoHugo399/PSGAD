import { ISuccessLogin, IFailedLogin } from './request.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Login } from '../../pages/login/login.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = 'http://localhost:3333/auth'

  constructor(private http: HttpClient, private Router: Router) { }


  login(user: Login): Observable<Login>{
    return this.http.post<Login>(`${this.baseUrl}/login`, user)
  }


  LoginSuccessful(res: ISuccessLogin): void {
    localStorage.setItem('tokenPSGAD', res.token)
    this.Router.navigate([''])
  }


  LoginFailed(res: IFailedLogin, user: Login): void {
    console.log(res.error.message)
    user.email = ''
    user.password = ''
  }
}
