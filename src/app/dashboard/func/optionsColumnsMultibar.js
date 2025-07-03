const optionsColumnsMultibar = (categories) => {
  const options = {
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top',
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (value) =>
        value !== 0
          ? value.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
          : '',
      offsetY: -30,
      style: {
        fontSize: '12px',
        colors: ['#304758'],
      },
    },
    yaxis: {
      labels: {
        formatter: (value) =>
          value.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 2 }),
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: categories ?? [],
    },
    fill: {
      opacity: 1,
    },
  }
  return options
}
export default optionsColumnsMultibar
