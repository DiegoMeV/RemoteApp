import ApexCharts from 'react-apexcharts'

const ChartDynamic = ({ options, height, series, type, justifyContent }) => {
  return (
    <div
      className={`chart-dynamic-container ${
        justifyContent ? `justify-${justifyContent}` : 'justify-start'
      }`}
      style={{
        minHeight: height ?? '350px',
        maxHeight: height ?? '350px',
      }}
    >
      <ApexCharts
        options={{
          ...options,
          noData: {
            text: 'No hay datos disponibles',
            style: {
              color: '#888',
              fontSize: '18px',
            },
          },
        }}
        series={series}
        type={type}
        height={height ?? '300px'}
        width={'100%'}
      />
    </div>
  )
}

export default ChartDynamic
