import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, empty } from 'rxjs';
import { IBalancoDeVendasService, OrderPedido, ChartData } from './balanco-de-vendas.model';
import { ChartJsData } from './chart.data';
import GlobalVarsLogin from '../login/login.model';

@Injectable({
  providedIn: 'root'
})
export class BalancoDeVendasService implements IBalancoDeVendasService {
  private ChartJsData = new ChartJsData()
  public config = this.ChartJsData.config
  public baseURL = GlobalVarsLogin.baseURL
  public meses = this.ChartJsData.meses
  public mesAtual = new Date().getMonth()
  public anoAtual = new Date().getFullYear()

  constructor(private http: HttpClient, private Router: Router) { }

  chartValues(): Observable<OrderPedido>{
    const headers = new HttpHeaders({'Authorization': localStorage.getItem('token') || 'UNDEFINED'});
    return this.http.get<OrderPedido>(`${this.baseURL}/order/completed`, {headers: headers}).pipe(tap((res)=>{

      this.config.data.datasets[0].data = []

      this.meses.map((e)=>{
        e.vendas = []
        e.valorTotal = 0
      })

      for(var i = 0; i < res.length; i++){
        let date = ((Date.now() - Date.parse(res.pedidos[i].data_pedido)) / (1000 * 60 * 60 * 24 * 30))
        let month = new Date((Date.parse(res.pedidos[i].data_pedido))).getMonth()
        let year = new Date((Date.parse(res.pedidos[i].data_pedido))).getFullYear()

        if(date < 12){
          this.meses.map((e:ChartData)=>{
            if(e.mesCount === month){
              if(month === this.mesAtual){
                if(year === this.anoAtual){
                  e.vendas.push(res.pedidos[i])
                  e.valorTotal += Number(res.pedidos[i].valor_total_pedido)
                }

              } else {
                e.vendas.push(res.pedidos[i])
                e.valorTotal += Number(res.pedidos[i].valor_total_pedido)
              }

            }
          })
        }
      }


      this.meses.map((e)=>{
        this.config.data.datasets[0].data.push(e.valorTotal)
      })

    })).pipe(catchError((err)=>{
      GlobalVarsLogin.asMessageError = 'Ocorreu um erro ao carregar a página'
      this.Router.navigate([''])
      return empty()
    }))
  }
}
