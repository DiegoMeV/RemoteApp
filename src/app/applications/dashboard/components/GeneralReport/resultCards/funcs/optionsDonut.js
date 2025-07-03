export const optionsDonut = ({ dark, labels }) => {
  const optionsDonut = {
    chart: {
      type: 'donut',
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
        donut: {
          labels: {
            show: true,
            total: {
              label: 'Alertas en total',
              show: true,
            },
          },
        },
      },
    },
    title: {
      text: 'Alertas por estado',
      align: 'center',
      style: {
        color: '#007DFF',
      },
    },
    labels: labels ?? [''],
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'gradient',
    },
    legend: {
      formatter: function (val, opts) {
        return `${val} - ${opts.w.globals.series[opts.seriesIndex]}`
      },
      position: 'bottom',
    },
    theme: {
      mode: dark === 'dark' ? 'dark' : 'light',
      monochrome: {
        enabled: true,
        shadeTo: 'dark',
        shadeIntensity: 0.6,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  }
  return optionsDonut
}
