import { Router } from '@angular/router';
import { Observable, catchError, empty } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IAddProdutoService } from './add-produto.model';
import { IRequest } from '../../services/global/global.model';
import { Injectable } from '@angular/core';
import GlobalVars from '../../services/global/global.model'
import { IProduct } from 'src/app/services/global/products.model';
import { IAllCategory } from 'src/app/services/global/categories.model';

@Injectable({
  providedIn: 'root'
})
export class AddProdutoService implements IAddProdutoService {
  constructor(private http: HttpClient, private Router: Router) { }
  baseURL = GlobalVars.baseURL

  readURL(archive: Event , preImage: HTMLImageElement, product: IProduct): void{
    const arc = (<HTMLInputElement>archive.target).files[0]
    if (arc) {
      var reader = new FileReader();

      reader.onload = function (e) {
        preImage.setAttribute('src', <string>e.target.result)
        product.file = arc
      };
      reader.readAsDataURL(arc);
    }
  }

  clearPreview(img: HTMLImageElement, inp: HTMLInputElement, product: IProduct): void{
    img.setAttribute('src', '')
    inp.value = ''
    product.file = undefined
  }

  getCategorias(): Observable<IAllCategory>{
    const headers = new HttpHeaders({'Authorization': localStorage.getItem('token') || 'UNDEFINED'});
    return this.http.get<IAllCategory>(`${this.baseURL}/categories`, {headers: headers}).pipe(catchError((err)=>{
      GlobalVars.asMessageError = 'Ocorreu um erro ao carregar a página'
      this.Router.navigate(['catalogo'])

      return empty()
    }))
  }

  createProduct(product: IProduct): Observable<IRequest>{
    const headers = new HttpHeaders({'Authorization': localStorage.getItem('token') || 'UNDEFINED'});
    const formData = new FormData()
    formData.append('file', product.file)
    formData.append('categoria', product.category)
    formData.append('descricao', product.description)
    formData.append('nome', product.name)
    formData.append('preco', product.price)

    return this.http.post<IRequest>(`${this.baseURL}/product`, formData, {headers: headers}).pipe(catchError((err)=>{
      GlobalVars.asMessageError = 'Ocorreu um erro ao criar o produto'
      this.Router.navigate(['catalogo'])
      return empty()
    }))
  }
}
