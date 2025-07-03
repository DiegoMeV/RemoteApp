const optionsDonutRequestManagement = ({
  infoCharts,
  type,
  label = 'Solicitudes en total',
  dark = 'light',
  funcLabel,
}) => {
  const infoDonut = infoCharts?.[type]

  const labelsDonut = infoDonut?.map((info) => {
    if (funcLabel) {
      return funcLabel(info)
    }
    const { label = '' } = info ?? {}
    return label
  })

  const optionsDonut = {
    chart: {
      width: 380,
      type: 'donut',
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
        donut: {
          labels: {
            show: true,
            total: {
              label,
              show: true,
            },
          },
        },
      },
    },
    labels: labelsDonut?.length > 0 ? labelsDonut : [''],
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
        const seriesValue = opts.w.globals.series[opts.seriesIndex]
        return !val && !seriesValue ? '' : `${val} - ${seriesValue || 0}`
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

  return { optionsDonut }
}

export default optionsDonutRequestManagement
