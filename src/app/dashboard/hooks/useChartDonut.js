const useChartDonut = () => {
  const optionsDonut = {
    labels: [
      'Solicitud Viáticos',
      'Prestación de servicios profesionales',
      'Otro tipo de proceso',
      'Otro tipo',
    ],
    legend: {
      show: false,
    },
  }

  const seriesDonut = [15, 25, 12, 40]
  return { optionsDonut, seriesDonut }
}

export default useChartDonut
