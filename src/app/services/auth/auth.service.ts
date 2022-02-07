import GlobalVars from '../global/global.model'
import { IAuthService } from './auth.model';
import { IRequest } from '../global/global.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService {
  baseUrl = GlobalVars.baseURL
  constructor(private http: HttpClient) { }

  verify():Observable<IRequest> {
    const headers = new HttpHeaders({'Authorization': localStorage.getItem('token') || 'UNDEFINED'});
    return this.http.get<IRequest>(`${this.baseUrl}/auth`, {headers: headers})
  }
}
