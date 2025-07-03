const optionsColumnsColorChart = ({ infoColumns }) => {
  const labelsColumns = infoColumns?.map(({ label = '' }) => label)
  const colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0']
  const chartBarRequest = {
    chart: {
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true,
      },
    },
    colors: colors,
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: labelsColumns,
      labels: {
        style: {
          fontSize: '12px',
        },
      },
    },
  }
  return { chartBarRequest }
}
export default optionsColumnsColorChart
