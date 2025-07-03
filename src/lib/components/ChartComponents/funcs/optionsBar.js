export const optionsBar = (dark, labels, title) => ({
  chart: {
    toolbar: {
      show: false,
    },
  },
  xaxis: {
    categories: labels,
  },
  title: {
    text: title ?? '',
    align: 'center',
    style: {
      color: '#007DFF',
    },
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: true,
      innerHeight: '20%',
    },
  },
  theme: {
    mode: dark === 'dark' ? 'dark' : 'light',
    monochrome: {
      enabled: true,
      shadeTo: 'dark',
      shadeIntensity: 0.6,
    },
  },
  dataLabels: {
    enabled: false,
  },
})
