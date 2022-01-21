import { IAuth } from './auth.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers = new HttpHeaders({'Authorization': localStorage.getItem('tokenPSGAD')});
  baseUrl = 'http://localhost:3333/auth'

  constructor(private http: HttpClient) { }

  verify():Observable<IAuth> {
    return this.http.get<IAuth>(`${this.baseUrl}/`, {headers: this.headers})
  }
}
