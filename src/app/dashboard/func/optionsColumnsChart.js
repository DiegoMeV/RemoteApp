const optionsColumnsChart = ({ infoCharts }) => {
  // Extract labels from the infoCharts object
  const labelsColumns = infoCharts?.['processes-by-origin-office']?.map(
    ({ label = '' }) => label
  ) || ['']

  // Define chart configuration options
  const columnsChartIndicators = {
    chart: {
      type: 'bar',
      height: 450, // Aumenta la altura del gráfico si es necesario
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
      formatter: function (val) {
        return val
      },
      offsetY: -30,
      style: {
        fontSize: '12px',
        colors: ['#304758'],
      },
    },
    series: [
      {
        name: 'Solicitudes',
        data: [196, 8, 33, 4, 3, 239, 8, 2, 14, 3, 2, 1],
      },
    ],
    xaxis: {
      categories: labelsColumns,
      labels: {
        rotate: -45, // Rotar las etiquetas a -45 grados
        style: {
          fontSize: '12px', // Reducir el tamaño de las etiquetas
        },
        formatter: function (value) {
          return value.length > 15 ? value.substring(0, 15) + '...' : value
        },
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + ' solicitudes' // Personalizar el tooltip para los valores
        },
      },
      x: {
        show: true,
        formatter: function (value, opts) {
          return opts.w.globals.labels[opts.dataPointIndex]
        },
      },
    },
  }

  // Return the chart configuration
  return { columnsChartIndicators }
}

export default optionsColumnsChart
