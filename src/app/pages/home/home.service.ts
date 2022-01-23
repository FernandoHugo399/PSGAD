import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IOrders } from './home.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  baseURL = 'http://localhost:3333'

  constructor(private http: HttpClient) { }

  pendingOrders(): Observable<IOrders> {
    const headers = new HttpHeaders({'Authorization': localStorage.getItem('token') || 'UNDEFINED'});
    return this.http.get<IOrders>(`${this.baseURL}/order/pending`, {headers: headers})
  }

}
