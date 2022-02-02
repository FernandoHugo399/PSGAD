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

  constructor(private BalancoDeVendasService: BalancoDeVendasService){
    Chart.register(...registerables)
  }

  public config: ChartConfiguration<keyof ChartTypeRegistry, (number | ScatterDataPoint | BubbleDataPoint)[], unknown>

  ngOnInit(): void {
    this.BalancoDeVendasService.chartValues().subscribe((res)=>{
      this.config = this.BalancoDeVendasService.config
      new Chart(  this.myChart.nativeElement, this.config)
    })

  }
}
