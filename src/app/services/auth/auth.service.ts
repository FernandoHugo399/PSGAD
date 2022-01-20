import { IFailedAuth, ISuccessAuth } from './auth.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers = new HttpHeaders({'Authorization': localStorage.getItem('tokenPSGAD')});
  baseUrl = 'http://localhost:3333/auth'

  constructor(private Router: Router, private http: HttpClient) { }

  verify():Observable<void> {
    return this.http.get<void>(`${this.baseUrl}/`, {headers: this.headers})
  }

  VerifyFailed(res:IFailedAuth):void {
    this.Router.navigate(['login'])
  }
}
