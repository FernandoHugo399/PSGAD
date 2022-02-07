import { Router } from '@angular/router';
import { BalancoDeVendasService } from './balanco-de-vendas.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables, BubbleDataPoint, ChartConfiguration, ChartTypeRegistry, ScatterDataPoint } from 'chart.js';
import GlobalVars from '../../services/global/global.model'

@Component({
  selector: 'app-balanco-de-vendas',
  templateUrl: './balanco-de-vendas.component.html',
  styleUrls: ['./balanco-de-vendas.component.css']
})
export class BalancoDeVendasComponent implements OnInit {

  @ViewChild('myChart', {static: true})  myChart: ElementRef

  constructor(private BalancoDeVendasService: BalancoDeVendasService, private Router: Router){
    Chart.register(...registerables)
  }
  public displayMain: boolean = false
  public currentMonthTotal: number
  public currentMonthTotalSales: number
  public percentageSales: number
  public percentageProductMoreSales: number
  public productWithMoreSales: string
  public deltaPercentageSales: string
  public config: ChartConfiguration<keyof ChartTypeRegistry, (number | ScatterDataPoint | BubbleDataPoint)[], unknown>

  ngOnInit(): void {
    this.BalancoDeVendasService.createGraphic().subscribe((res)=>{

      if(res.error){
        GlobalVars.asMessageError = res.message
        this.Router.navigate([''])

      }else if (res.authError){
        GlobalVars.asMessageError = 'Sua sessão expirou'
        this.Router.navigate(['login'])

      } else {
        this.config = this.BalancoDeVendasService.config
        new Chart(  this.myChart.nativeElement, this.config)

        this.currentMonthTotal = this.BalancoDeVendasService.currentMonthTotal
        this.currentMonthTotalSales = this.BalancoDeVendasService.currentMonthTotalSales
        this.percentageSales = this.BalancoDeVendasService.percentageSales
        this.percentageProductMoreSales = this.BalancoDeVendasService.percentageProductMoreSales
        this.productWithMoreSales = this.BalancoDeVendasService.productWithMoreSales.name
        if(!this.percentageProductMoreSales){
          this.percentageProductMoreSales = 0
          this.productWithMoreSales = 'Indefinido'
        }
        if(this.percentageSales >= 0){
          this.deltaPercentageSales = 'maior'
        } else {
          this.percentageSales = this.percentageSales * -1
          this.deltaPercentageSales = 'menor'
        }

        this.displayMain = true
      }
    })

  }
}
