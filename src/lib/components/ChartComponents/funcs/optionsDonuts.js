export const optionsDonuts = (dark, labels = [], title) => {
  const optionsDonuts = {
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
              label: 'Total',
              show: true,
            },
          },
        },
      },
    },
    title: {
      text: title ?? 'Alertas por estado',
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
  return optionsDonuts
}
