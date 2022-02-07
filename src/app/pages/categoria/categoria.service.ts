import { ICategoria, ICategoriaService, IRequest } from './categoria.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, empty } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import GlobalVarsLogin from '../login/login.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService implements ICategoriaService{
  baseURL = GlobalVarsLogin.baseURL
  constructor(private Router:Router, private http: HttpClient) { }

  getCategory(): Observable<ICategoria>{
    const headers = new HttpHeaders({'Authorization': localStorage.getItem('token') || 'UNDEFINED'});
    return this.http.get<ICategoria>(`${this.baseURL}/categories`, {headers: headers}).pipe(catchError((err)=>{
      GlobalVarsLogin.asMessageError = 'Ocorreu um erro ao carregar a página'
      this.Router.navigate(['catalogo'])

      return empty()
    }))
  }

  createCategory(nome: string): Observable<IRequest>{
    const headers = new HttpHeaders({'Authorization': localStorage.getItem('token') || 'UNDEFINED'});
    return this.http.post<IRequest>(`${this.baseURL}/categories`, {nome: nome}, {headers: headers})
  }

  deleteCategory(id:number): Observable<IRequest>{
    const headers = new HttpHeaders({'Authorization': localStorage.getItem('token') || 'UNDEFINED'});
    return this.http.delete<IRequest>(`${this.baseURL}/categories/${id}`, {headers: headers})
  }
}
