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

  public config: ChartConfiguration<keyof ChartTypeRegistry, (number | ScatterDataPoint | BubbleDataPoint)[], unknown>

  ngOnInit(): void {
    this.BalancoDeVendasService.chartValues().subscribe((res)=>{

      if(res.error){
        GlobalVarsLogin.asMessageError = res.message
        this.Router.navigate([''])

      } else {
        this.config = this.BalancoDeVendasService.config
        new Chart(  this.myChart.nativeElement, this.config)
      }


    })

  }
}
