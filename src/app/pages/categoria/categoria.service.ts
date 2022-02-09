import { ICategoriaService } from './categoria.model';
import { IRequest } from '../../services/global/global.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, empty } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import GlobalVars from '../../services/global/global.model'
import { IAllCategory } from 'src/app/services/global/categories.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService implements ICategoriaService{
  baseURL = GlobalVars.baseURL
  constructor(private Router:Router, private http: HttpClient) { }

  getCategory(): Observable<IAllCategory>{
    const headers = new HttpHeaders({'Authorization': localStorage.getItem('token') || 'UNDEFINED'});
    return this.http.get<IAllCategory>(`${this.baseURL}/categories`, {headers: headers}).pipe(catchError((err)=>{
      GlobalVars.asMessageError = 'Ocorreu um erro ao carregar a página'
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
