import { BubbleDataPoint, ChartConfiguration, ChartTypeRegistry, ScatterDataPoint } from 'chart.js';
import { ChartData } from './balanco-de-vendas.model';
let mesAtual = new Date().getMonth()

const meses: ChartData[] = []
for(var i = 0; i < 12; i++){

    switch(mesAtual){
        case 0:
            meses.push({mes: 'Janeiro', mesCount: 0, vendas: [], valorTotal: 0})
            break
        case 1:
            meses.push({mes: 'Fevereiro', mesCount: 1, vendas: [], valorTotal: 0})
            break
        case 2:
            meses.push({mes: 'Março', mesCount: 2, vendas: [], valorTotal: 0})
            break
        case 3:
            meses.push({mes: 'Abril', mesCount: 3, vendas: [], valorTotal: 0})
            break
        case 4:
            meses.push({mes: 'Maio', mesCount: 4, vendas: [], valorTotal: 0})
            break
        case 5:
            meses.push({mes: 'Junho', mesCount: 5, vendas: [], valorTotal: 0})
            break
        case 6:
            meses.push({mes: 'Julho', mesCount: 6, vendas: [], valorTotal: 0})
            break
        case 7:
            meses.push({mes: 'Agosto', mesCount: 7, vendas: [], valorTotal: 0})
            break
        case 8:
            meses.push({mes: 'Setembro', mesCount: 8, vendas: [], valorTotal: 0})
            break
        case 9:
            meses.push({mes: 'Outubro', mesCount: 9, vendas: [], valorTotal: 0})
            break
        case 10:
            meses.push({mes: 'Novembro', mesCount: 10, vendas: [], valorTotal: 0})
            break
        case 11:
            meses.push({mes: 'Dezembro', mesCount: 11, vendas: [], valorTotal: 0})
            break
        }
    if(mesAtual === 0){
        mesAtual = 12
    }
    mesAtual--
}

meses.reverse()
const labels: string[] = []

meses.map((e: ChartData)=>{
    labels.push(e.mes)
})

export class ChartJsData{

  public meses = meses

  public data = {
    labels: labels,
    datasets: [
    {
        label: 'Vendas no mês',
        backgroundColor: 'rgb(252, 210, 50)',
        borderColor: 'rgb(252, 210, 50)',
        data:  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0],
        borderRadius: 30,
    }
    ]
  }

  public option: unknown = {
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context: { dataset: { label: string; }; parsed: { y: number | bigint; }; }) {
            let label = context.dataset.label || '';

            if (label) {
                label += ': ';
            }
            if (context.parsed.y !== null) {
                label += new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.parsed.y);
            }
            return label;
          }
        }
      },
    },

    scales:{
      y:{
        beginAtZero: true,
        grid:{
          borderWidth: 0,
          lineWidth: 0
        }
      },
      x:{
        beginAtZero: true,
        grid:{
          borderWidth: 0,
          lineWidth: 0
        }
      }
    },

    responsive: true,

    maintainAspectRatio: false
  }

  public config: ChartConfiguration<keyof ChartTypeRegistry, (number | ScatterDataPoint | BubbleDataPoint)[], unknown>  = {
    type: 'bar',
    data: this.data,
    options: this.option
  }}
