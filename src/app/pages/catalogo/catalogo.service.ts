import { Product, ICatalogoService } from './catalogo.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import GlobalVarsLogin from '../login/login.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService implements ICatalogoService {

  baseURL = GlobalVarsLogin.baseURL
  constructor(private http: HttpClient) { }


  allProducts(): Observable<Product>{
    const headers = new HttpHeaders({'Authorization': localStorage.getItem('token') || 'UNDEFINED'});
    return this.http.get<Product>(`${this.baseURL}/product`, {headers: headers});
  }

}
