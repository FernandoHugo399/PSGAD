import { IAuth, IAuthService } from './auth.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService {
  baseUrl = 'http://localhost:3333/auth'
  headers = new HttpHeaders({'Authorization': localStorage.getItem('token')});
  constructor(private http: HttpClient) { }

  verify():Observable<IAuth> {
    return this.http.get<IAuth>(`${this.baseUrl}/`, {headers: this.headers})
  }
}
