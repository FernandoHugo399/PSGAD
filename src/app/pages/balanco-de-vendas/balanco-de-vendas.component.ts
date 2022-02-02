import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ChartJsData } from './chart.data'

@Component({
  selector: 'app-balanco-de-vendas',
  templateUrl: './balanco-de-vendas.component.html',
  styleUrls: ['./balanco-de-vendas.component.css']
})
export class BalancoDeVendasComponent implements OnInit {

  @ViewChild('myChart', {static: true})  myChart: ElementRef
  ChartJsData = new ChartJsData()

  constructor(){
    Chart.register(...registerables)
  }

  public config = this.ChartJsData.config

  ngOnInit(): void {
    new Chart(  this.myChart.nativeElement, this.config)
  }
}
