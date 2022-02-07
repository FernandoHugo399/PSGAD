import { Router } from '@angular/router';
import { Product, ICatalogoService } from './catalogo.model';
import { Observable, catchError, empty } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import GlobalVars from '../../services/global/global.model'

@Injectable({
  providedIn: 'root'
})
export class CatalogoService implements ICatalogoService {
  public baseURL = GlobalVars.baseURL
  constructor(private http: HttpClient, private Router: Router) { }


  allProducts(): Observable<Product>{
    const headers = new HttpHeaders({'Authorization': localStorage.getItem('token') || 'UNDEFINED'});
    return this.http.get<Product>(`${this.baseURL}/product`, {headers: headers}).pipe(catchError((err)=>{
      GlobalVars.asMessageError = 'Ocorreu um erro ao carregar os produtos'
      this.Router.navigate([''])
      return empty()
    }));
  }

}
