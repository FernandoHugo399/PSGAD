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
  public totalMesAtual: number
  public vendaTotaisMesAtual: number
  public totalMesAnterior: number
  public vendaTotaisMesAnterior: number

  public produtosVendidosMesAtual: string[]
  public produtosSuasVendas: {
    nome: string
    quantidade? : number
  }[] = []

  public mesAtual = new Date().getMonth()
  public anoAtual = new Date().getFullYear()
  public porcentVendas: number

  constructor(private http: HttpClient, private Router: Router) { }

  graphicValues(order: OrderPedido): void {
    for(var i = 0; i < order.length; i++){
      let date = ((Date.now() - Date.parse(order.pedidos[i].data_pedido)) / (1000 * 60 * 60 * 24 * 30))
      let month = new Date((Date.parse(order.pedidos[i].data_pedido))).getMonth()
      let year = new Date((Date.parse(order.pedidos[i].data_pedido))).getFullYear()

      if(date >= 0 && date < 12){
        this.meses.map((mes:ChartData)=>{
          if(mes.mesCount === month){
            if(month === this.mesAtual){
              if(year === this.anoAtual){
                mes.vendas.push(order.pedidos[i])
                mes.valorTotal += Number(order.pedidos[i].valor_total_pedido)
              }

            } else {
              mes.vendas.push(order.pedidos[i])
              mes.valorTotal += Number(order.pedidos[i].valor_total_pedido)
            }

          }
        })
      }
    }
  }

  pedidosMesAnteriorEAtual(): void{
    this.meses.map((mes)=>{
      if(mes.mesCount === this.mesAtual){
        this.produtosVendidosMesAtual = mes.vendas.map((product)=>{
          return product.produto
        })
        this.totalMesAtual = mes.valorTotal
        this.vendaTotaisMesAtual = mes.vendas.length

      } if(mes.mesCount === 11 && this.mesAtual === 0 ){
        this.totalMesAnterior = mes.valorTotal
        this.vendaTotaisMesAnterior = mes.vendas.length

      }else if(mes.mesCount === this.mesAtual - 1){
        this.totalMesAnterior = mes.valorTotal
        this.vendaTotaisMesAnterior = mes.vendas.length

      }
      this.config.data.datasets[0].data.push(mes.valorTotal)

    })
  }

  porcentagemDeVendas(porcentVendas: number, vendaTotaisMesAtual: number, vendaTotaisMesAnterior: number): void{
    if(vendaTotaisMesAnterior <= 0){
      porcentVendas = vendaTotaisMesAtual * 100
    } else if (vendaTotaisMesAtual <= 0){
      porcentVendas = vendaTotaisMesAnterior * -100
    } else if (vendaTotaisMesAtual > vendaTotaisMesAnterior) {
      porcentVendas = ((vendaTotaisMesAtual - vendaTotaisMesAnterior) / vendaTotaisMesAnterior) * 100
    } else if (vendaTotaisMesAtual < vendaTotaisMesAnterior) {
      porcentVendas = ((vendaTotaisMesAnterior - vendaTotaisMesAtual) / vendaTotaisMesAnterior) * -100
    } else if(vendaTotaisMesAtual === vendaTotaisMesAnterior) {
      porcentVendas = 0
    }
    this.porcentVendas = porcentVendas
  }

  chartValues(): Observable<OrderPedido>{
    const headers = new HttpHeaders({'Authorization': localStorage.getItem('token') || 'UNDEFINED'});
    return this.http.get<OrderPedido>(`${this.baseURL}/order/completed`, {headers: headers}).pipe(tap((res)=>{

      this.config.data.datasets[0].data = []
      this.meses.map((mes)=>{
        mes.vendas = []
        mes.valorTotal = 0
      })
      this.graphicValues(res)
      this.pedidosMesAnteriorEAtual()
      this.porcentagemDeVendas(this.porcentVendas, this.vendaTotaisMesAtual, this.vendaTotaisMesAnterior)


      /* this.produtosVendidosMesAtual.push('pão integral com grãos')
      this.produtosVendidosMesAtual.push('doce de chocolate amargo')
      this.produtosVendidosMesAtual.push('doce de chocolate amargo')
      console.log(this.produtosVendidosMesAtual)
      this.produtosVendidosMesAtual.map((e)=>{
        if(this.produtosSuasVendas.length === 0){
          this.produtosSuasVendas.push({
            nome: e,
            quantidade: 1
          })

        }else if(this.produtosSuasVendas.length !== 0){

        if(this.produtosSuasVendas.some(res => res.nome === e)){
          this.produtosSuasVendas.some(res => {
            res.quantidade ++
          })

        } else {
          this.produtosSuasVendas.push({
            nome: e,
            quantidade: 1
          })
        }

        }
      })
      console.log(this.produtosSuasVendas) */

    })).pipe(catchError((err)=>{
      console.log(err)
      GlobalVarsLogin.asMessageError = 'Ocorreu um erro ao carregar a página'
      this.Router.navigate([''])
      return empty()
    }))
  }
}
