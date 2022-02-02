export class ChartJsData{

  public data = {
    labels: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'],
    datasets: [
    {
        label: 'Vendas no mês',
        backgroundColor: 'rgb(252, 210, 50)',
        borderColor: 'rgb(252, 210, 50)',
        data:  [2345, 2221, 5443, 3543, 3412, 1253, 7643, 3512, 8765, 7656, 4432, 5653],
        borderRadius: 30,
    }
    ]
  }

  public option = {
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

  public config: any = {
    type: 'bar',
    data: this.data,
    options: this.option
  }
}
