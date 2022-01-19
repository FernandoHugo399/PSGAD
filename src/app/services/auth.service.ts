import { ISuccessLogin, IFailedLogin } from './request.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Login } from '../pages/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost:3333/auth'

  constructor(private http: HttpClient) { }

  login(user: Login): Observable<Login>{
    return this.http.post<Login>(`${this.baseUrl}/login`, user)
  }

  LoginSuccessful(res: ISuccessLogin): void {
    console.log(res.token)
  }

  LoginFailed(res: IFailedLogin): void {
    console.log(res)
  }
}
