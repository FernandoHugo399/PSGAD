import { Router } from '@angular/router';
import GlobalVars from '../../services/global/global.model'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IHomeService } from './home.model';
import { Observable, tap, catchError, empty } from 'rxjs';
import { Injectable } from '@angular/core';
import { IAllPendingOrders } from 'src/app/services/global/orders.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService implements IHomeService{
  baseURL = GlobalVars.baseURL

  constructor(private http: HttpClient, private Router: Router) { }

  pendingOrders(): Observable<IAllPendingOrders> {
    const headers = new HttpHeaders({'Authorization': localStorage.getItem('token') || 'UNDEFINED'});
    return this.http.get<IAllPendingOrders>(`${this.baseURL}/order/pending`, {headers: headers}).pipe(tap((resul)=>{
      let dados = resul

      for (let i = 0; i < dados.length; i++){
        let data = (Date.now() - Date.parse(resul.orders[i].order_date)) / (1000 * 60 * 60 * 24 * 30)
        if (data >= 1){
          if(Math.round(data) == 1){
            resul.orders[i].formattedTime = `Há ${Math.round(data)} mês`
          } else {
              resul.orders[i].formattedTime = `Há ${Math.round(data)} meses`
          }
        }

        if(data < 1){
          data = data * 30
          if(Math.round(data) == 1){
            resul.orders[i].formattedTime = `Há ${Math.round(data)} dia`
          } else {
            resul.orders[i].formattedTime = `Há ${Math.round(data)} dias`
          }
        }

        if(data < 1){
          data = data * 24
          if(Math.round(data) == 1){
            resul.orders[i].formattedTime = `Há ${Math.round(data)} hora`
          } else {
            resul.orders[i].formattedTime = `Há ${Math.round(data)} horas`
          }
        }

        if(data < 1){
          data = data * 60
          if(Math.round(data) == 0){
            resul.orders[i].formattedTime = 'Agora mesmo'

          } else if(Math.round(data) == 1){
            resul.orders[i].formattedTime = `Há ${Math.round(data)} minuto`

          } else {
            resul.orders[i].formattedTime = `Há ${Math.round(data)} minutos`
          }
        }
      }
    })).pipe(catchError((err)=>{
      GlobalVars.asMessageError = 'Ocorreu um erro interno'
      this.Router.navigate(['login'])
      return empty()
    }))
  }

}
