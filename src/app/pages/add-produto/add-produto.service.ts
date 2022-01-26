import { Router } from '@angular/router';
import { Observable, catchError, empty } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IAddProdutoService, ICategoria } from './add-produto.model';
import { Injectable } from '@angular/core';
import GlobalVarsLogin from '../login/login.model';

@Injectable({
  providedIn: 'root'
})
export class AddProdutoService implements IAddProdutoService {
  constructor(private http: HttpClient, private Router: Router) { }
  baseURL = GlobalVarsLogin.baseURL

  readURL(archive: any , preImage: HTMLImageElement): void{
    if (archive.target.files && archive.target.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e: any) {
        console.log(preImage.setAttribute('src', e.target.result))
      };
      reader.readAsDataURL(archive.target.files[0]);
    }
  }

  clearPreview(img: HTMLImageElement, inp: HTMLInputElement): void{
    img.setAttribute('src', '')
    inp.value = ''
  }

  getCategorias(): Observable<ICategoria>{
    const headers = new HttpHeaders({'Authorization': localStorage.getItem('token') || 'UNDEFINED'});
    return this.http.get<ICategoria>(`${this.baseURL}/categories`, {headers: headers}).pipe(catchError((err)=>{
      GlobalVarsLogin.asMessageError = 'Ocorreu um erro ao carregar a página'
      this.Router.navigate(['catalogo'])

      return empty()
    }))
  }
}
