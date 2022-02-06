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
  private months = this.ChartJsData.month
  public currentMonthTotal: number
  public currentMonthTotalSales: number
  public totalPreviousMonth: number
  private totalOrderPreviousMonth: number
  private previousMonthTotalSales: string[]
  private productAndTheirSales: {
    name: string
    length : number
  }[] = []
  public productWithMoreSales: {
    name: string
    length: number
  } = {
    name: '',
    length : 0
  }

  private atualMonth = new Date().getMonth()
  private atualYear = new Date().getFullYear()
  public percentageSales: number
  public percentageProductMoreSales: number

  constructor(private http: HttpClient, private Router: Router) { }



  valuesOfGraphic(order: OrderPedido): void {
    for(var i = 0; i < order.length; i++){
      let date = ((Date.now() - Date.parse(order.pedidos[i].data_pedido)) / (1000 * 60 * 60 * 24 * 30))
      let month = new Date((Date.parse(order.pedidos[i].data_pedido))).getMonth()
      let year = new Date((Date.parse(order.pedidos[i].data_pedido))).getFullYear()

      if(date >= 0 && date < 12){
        this.months.map((Month:ChartData)=>{
          if(Month.mesCount === month){
            if(month === this.atualMonth){
              if(year === this.atualYear){
                Month.vendas.push(order.pedidos[i])
                Month.valorTotal += Number(order.pedidos[i].valor_total_pedido)
              }

            } else {
              Month.vendas.push(order.pedidos[i])
              Month.valorTotal += Number(order.pedidos[i].valor_total_pedido)
            }

          }
        })
      }
    }
  }



  previousAndCorrentMonthOrders(): void{
    this.months.map((month)=>{
      if(month.mesCount === this.atualMonth){
        this.previousMonthTotalSales = month.vendas.map((product)=>{
          return product.produto
        })
        this.currentMonthTotal = Number(month.valorTotal.toFixed(2))
        this.currentMonthTotalSales = month.vendas.length

      } if(month.mesCount === 11 && this.atualMonth === 0 ){
        this.totalPreviousMonth = Number(month.valorTotal.toFixed(2))
        this. totalOrderPreviousMonth = month.vendas.length

      }else if(month.mesCount === this.atualMonth - 1){
        this.totalPreviousMonth = Number(month.valorTotal.toFixed(2))
        this. totalOrderPreviousMonth = month.vendas.length

      }
      this.config.data.datasets[0].data.push(Number(month.valorTotal.toFixed(2)))

    })
  }



  percentageOfOrders(porcentVendas: number, vendaTotaisMesAtual: number, vendaTotaisMesAnterior: number): void{
    if(vendaTotaisMesAnterior <= 0){
      porcentVendas = Math.round(vendaTotaisMesAtual * 100)
    } else if (vendaTotaisMesAtual <= 0){
      porcentVendas = Math.round(vendaTotaisMesAnterior * -100)
    } else if (vendaTotaisMesAtual > vendaTotaisMesAnterior) {
      porcentVendas = Math.round(((vendaTotaisMesAtual - vendaTotaisMesAnterior) / vendaTotaisMesAnterior) * 100)
    } else if (vendaTotaisMesAtual < vendaTotaisMesAnterior) {
      porcentVendas = Math.round(((vendaTotaisMesAnterior - vendaTotaisMesAtual) / vendaTotaisMesAnterior) * -100)
    } else if(vendaTotaisMesAtual === vendaTotaisMesAnterior) {
      porcentVendas = 0
    }
    this.percentageSales = porcentVendas
  }



  productWithMoreOrdersInMonth(): void{
    const filterProdutosMesAtual = [...new Set(this.previousMonthTotalSales)]
    filterProdutosMesAtual.map((product)=>{
      this.productAndTheirSales.push({
        name: product,
        length: this.previousMonthTotalSales.filter(e => e === product).length
      })
    })

    this.productAndTheirSales.map((product)=>{
      if(product.length > this.productWithMoreSales.length){
        this.productWithMoreSales ={
          name: product.name,
          length: product.length
        }
      }
    })
  }



  percentageProductMoreSalesInMonth(produtoComMaisVendas: number, vendaTotaisMesAtual: number): void{
    this.percentageProductMoreSales = Math.round((produtoComMaisVendas * 100) / vendaTotaisMesAtual)
  }



  createGraphic(): Observable<OrderPedido>{
    const headers = new HttpHeaders({'Authorization': localStorage.getItem('token') || 'UNDEFINED'});
    return this.http.get<OrderPedido>(`${this.baseURL}/order/completed`, {headers: headers}).pipe(tap((res)=>{

      this.config.data.datasets[0].data = []
      this.productAndTheirSales = []
      this.months.map((month)=>{
        month.vendas = []
        month.valorTotal = 0
      })

      this.valuesOfGraphic(res)
      this.previousAndCorrentMonthOrders()
      this.percentageOfOrders(this.percentageSales, this.currentMonthTotalSales, this.totalOrderPreviousMonth)
      this.productWithMoreOrdersInMonth()
      this.percentageProductMoreSalesInMonth(this.productWithMoreSales.length, this.currentMonthTotalSales)

    })).pipe(catchError((err)=>{
      console.log(err)
      GlobalVarsLogin.asMessageError = 'Ocorreu um erro ao carregar a página'
      this.Router.navigate([''])
      return empty()
    }))
  }
}
