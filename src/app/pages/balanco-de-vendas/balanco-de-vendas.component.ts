import { Router } from '@angular/router';
import  GlobalVarsLogin  from 'src/app/pages/login/login.model';
import { BalancoDeVendasService } from './balanco-de-vendas.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables, BubbleDataPoint, ChartConfiguration, ChartTypeRegistry, ScatterDataPoint } from 'chart.js';


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
  public totalMesAtual: number
  public vendasTotaisMesAtual: number
  public porcentVendas: number
  public porcentProdutoComMaisVendas: number
  public produtoComMaisVendas: string
  public deltaPorcentVendas: string
  public config: ChartConfiguration<keyof ChartTypeRegistry, (number | ScatterDataPoint | BubbleDataPoint)[], unknown>

  ngOnInit(): void {
    this.BalancoDeVendasService.chartValues().subscribe((res)=>{

      if(res.error){
        GlobalVarsLogin.asMessageError = res.message
        this.Router.navigate([''])

      }else if (res.authError){
        GlobalVarsLogin.asMessageError = 'Sua sessão expirou'
        this.Router.navigate(['login'])

      } else {
        this.config = this.BalancoDeVendasService.config
        new Chart(  this.myChart.nativeElement, this.config)

        this.totalMesAtual = this.BalancoDeVendasService.totalMesAtual
        this.vendasTotaisMesAtual = this.BalancoDeVendasService.vendaTotaisMesAtual
        this.porcentVendas = this.BalancoDeVendasService.porcentVendas
        this.porcentProdutoComMaisVendas = this.BalancoDeVendasService.porcentProdutoComMaisVendas
        this.produtoComMaisVendas = this.BalancoDeVendasService.produtoComMaisVendas.nome

        if(this.porcentVendas >= 0){
          this.deltaPorcentVendas = 'maior'
        } else {
          this.porcentVendas = this.porcentVendas * -1
          this.deltaPorcentVendas = 'menor'
        }

        this.displayMain = true
      }
    })

  }
}
