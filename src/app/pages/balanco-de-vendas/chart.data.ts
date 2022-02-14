import { BubbleDataPoint, ChartConfiguration, ChartTypeRegistry, ScatterDataPoint } from 'chart.js';
import { ChartData } from './balanco-de-vendas.model';
let mesAtual = new Date().getMonth()

const month: ChartData[] = []
for(var i = 0; i < 12; i++){

  switch(mesAtual){
    case 0:
      month.push({month: 'Janeiro', monthCount: 0, orders: [], total_value: 0})
      break
    case 1:
      month.push({month: 'Fevereiro', monthCount: 1, orders: [], total_value: 0})
      break
    case 2:
      month.push({month: 'Março', monthCount: 2, orders: [], total_value: 0})
      break
    case 3:
      month.push({month: 'Abril', monthCount: 3, orders: [], total_value: 0})
      break
    case 4:
      month.push({month: 'Maio', monthCount: 4, orders: [], total_value: 0})
      break
    case 5:
        month.push({month: 'Junho', monthCount: 5, orders: [], total_value: 0})
        break
    case 6:
      month.push({month: 'Julho', monthCount: 6, orders: [], total_value: 0})
      break
    case 7:
      month.push({month: 'Agosto', monthCount: 7, orders: [], total_value: 0})
      break
    case 8:
      month.push({month: 'Setembro', monthCount: 8, orders: [], total_value: 0})
      break
    case 9:
      month.push({month: 'Outubro', monthCount: 9, orders: [], total_value: 0})
      break
    case 10:
      month.push({month: 'Novembro', monthCount: 10, orders: [], total_value: 0})
      break
    case 11:
      month.push({month: 'Dezembro', monthCount: 11, orders: [], total_value: 0})
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
    labels.push(e.month)
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
