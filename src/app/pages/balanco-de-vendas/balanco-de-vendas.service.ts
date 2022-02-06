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
  private baseURL = GlobalVarsLogin.baseURL
  private meses = this.ChartJsData.meses
  public totalMesAtual: number
  public vendaTotaisMesAtual: number
  private totalMesAnterior: number
  private vendaTotaisMesAnterior: number
  private produtosVendidosMesAtual: string[]

  private produtosSuasVendas: {
    nome: string
    quantidade : number
  }[] = []

  private produtoComMaisVendas: {
    nome: string
    quantidade: number
  } = {
    nome: '',
    quantidade : 0
  }

  private mesAtual = new Date().getMonth()
  private anoAtual = new Date().getFullYear()
  public porcentVendas: number
  public porcentProdutoComMaisVendas: number

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

  produtoComMaisVendasNoMes(): void{
    const filterProdutosMesAtual = [...new Set(this.produtosVendidosMesAtual)]
    filterProdutosMesAtual.map((product)=>{
      this.produtosSuasVendas.push({
        nome: product,
        quantidade: this.produtosVendidosMesAtual.filter(e => e === product).length
      })
    })

    this.produtosSuasVendas.map((product)=>{
      if(product.quantidade > this.produtoComMaisVendas.quantidade){
        this.produtoComMaisVendas ={
          nome: product.nome,
          quantidade: product.quantidade
        }
      }
    })
  }

  porcentProdutMaisVendasNoMes(produtoComMaisVendas: number, vendaTotaisMesAtual: number): void{
    this.porcentProdutoComMaisVendas = (produtoComMaisVendas * 100) / vendaTotaisMesAtual
  }

  chartValues(): Observable<OrderPedido>{
    const headers = new HttpHeaders({'Authorization': localStorage.getItem('token') || 'UNDEFINED'});
    return this.http.get<OrderPedido>(`${this.baseURL}/order/completed`, {headers: headers}).pipe(tap((res)=>{

      this.config.data.datasets[0].data = []
      this.produtosSuasVendas = []
      this.meses.map((mes)=>{
        mes.vendas = []
        mes.valorTotal = 0
      })

      this.graphicValues(res)
      this.pedidosMesAnteriorEAtual()
      this.porcentagemDeVendas(this.porcentVendas, this.vendaTotaisMesAtual, this.vendaTotaisMesAnterior)
      this.produtoComMaisVendasNoMes()
      this.porcentProdutMaisVendasNoMes(this.produtoComMaisVendas.quantidade, this.vendaTotaisMesAtual)

    })).pipe(catchError((err)=>{
      console.log(err)
      GlobalVarsLogin.asMessageError = 'Ocorreu um erro ao carregar a página'
      this.Router.navigate([''])
      return empty()
    }))
  }
}
