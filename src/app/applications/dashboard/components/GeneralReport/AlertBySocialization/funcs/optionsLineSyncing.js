export const optionsLineSyncing = ({ dark, labels }) => {
  const optionsSmall = {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    },
    theme: {
      mode: dark === 'dark' ? 'dark' : 'light',
      monochrome: {
        enabled: true,
        shadeTo: 'dark',
        shadeIntensity: 0.6,
      },
    },
    markers: {
      size: 5,
      hover: {
        size: 9,
      },
      colors: '#FF94A3',
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: labels ?? [],
    },
  }
  return optionsSmall
}
