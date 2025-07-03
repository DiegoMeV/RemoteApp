export const optionsPie = (dark, labels = [], title) => {
  const optionsPie = {
    chart: {
      type: 'donut',
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
      formatter(val) {
        return [val.toFixed(1) + '%']
      },
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
    plotOptions: {
      pie: {
        dataLabels: {
          offset: -5,
        },
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
  return optionsPie
}
