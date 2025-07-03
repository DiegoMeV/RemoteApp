export const optionsRiskCriterionChart = (dark, labels) => {
  const optionsBar = {
    chart: {
      id: 'basic-bar',
    },
    xaxis: {
      categories: labels,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
        innerHeight: '20%',
      },
    },
    dataLabels: {
      enabled: false,
    },

    theme: {
      mode: dark === 'dark' ? 'dark' : 'light',
      monochrome: {
        enabled: true,
        shadeTo: 'dark',
        shadeIntensity: 0.6,
      },
    },
  }

  return optionsBar
}
