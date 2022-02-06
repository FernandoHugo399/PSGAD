import { BubbleDataPoint, ChartConfiguration, ChartTypeRegistry, ScatterDataPoint } from 'chart.js';
import { ChartData } from './balanco-de-vendas.model';
let mesAtual = new Date().getMonth()

const month: ChartData[] = []
for(var i = 0; i < 12; i++){

  switch(mesAtual){
    case 0:
      month.push({mes: 'Janeiro', mesCount: 0, vendas: [], valorTotal: 0})
      break
    case 1:
      month.push({mes: 'Fevereiro', mesCount: 1, vendas: [], valorTotal: 0})
      break
    case 2:
      month.push({mes: 'Março', mesCount: 2, vendas: [], valorTotal: 0})
      break
    case 3:
      month.push({mes: 'Abril', mesCount: 3, vendas: [], valorTotal: 0})
      break
    case 4:
      month.push({mes: 'Maio', mesCount: 4, vendas: [], valorTotal: 0})
      break
    case 5:
        month.push({mes: 'Junho', mesCount: 5, vendas: [], valorTotal: 0})
        break
    case 6:
      month.push({mes: 'Julho', mesCount: 6, vendas: [], valorTotal: 0})
      break
    case 7:
      month.push({mes: 'Agosto', mesCount: 7, vendas: [], valorTotal: 0})
      break
    case 8:
      month.push({mes: 'Setembro', mesCount: 8, vendas: [], valorTotal: 0})
      break
    case 9:
      month.push({mes: 'Outubro', mesCount: 9, vendas: [], valorTotal: 0})
      break
    case 10:
      month.push({mes: 'Novembro', mesCount: 10, vendas: [], valorTotal: 0})
      break
    case 11:
      month.push({mes: 'Dezembro', mesCount: 11, vendas: [], valorTotal: 0})
      break
    }

  if(mesAtual === 0){
      mesAtual = 12
  }
  mesAtual--
}

month.reverse()
const labels: string[] = []

month.map((e: ChartData)=>{
    labels.push(e.mes)
})

export class ChartJsData{

  public month = month

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
