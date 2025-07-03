const optionsRowsChart = ({ infoCharts, type }) => {
  const labelsColumns = infoCharts?.[type]?.map(({ label = '' }) => label)
  const chartbarInformation = {
    chart: {
      type: 'bar',
      height: 430,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: 'top',
        },
      },
    },
    dataLabels: {
      enabled: true,
      offsetX: 20,
      style: {
        fontSize: '12px',
        colors: ['#000'],
      },
    },
    stroke: {
      show: true,
      width: 1,
      colors: ['#fff'],
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    xaxis: {
      categories: labelsColumns?.length > 0 ? labelsColumns : [''],
    },
  }
  return { chartbarInformation }
}
export default optionsRowsChart
