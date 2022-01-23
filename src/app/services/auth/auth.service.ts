import { IAuth, IAuthService } from './auth.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService {
  baseUrl = 'http://localhost:3333'
  constructor(private http: HttpClient) { }

  verify():Observable<IAuth> {
    const headers = new HttpHeaders({'Authorization': localStorage.getItem('token') || 'UNDEFINED'});
    return this.http.get<IAuth>(`${this.baseUrl}/auth'`, {headers: headers})
  }
}
