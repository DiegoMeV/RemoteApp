import { Stack } from '@mui/material'
import styles from './styles/Dashboard.module.css'
import ApexCharts from 'react-apexcharts'

const ChartDynamic = ({ options, height, series, type, justifyContent }) => {
  return (
    <Stack
      className={styles.stackChart}
      backgroundColor='backgroundCharts'
      sx={{
        px: 5,
        py: 2,
        minHeight: height ?? '350px',
        maxHeight: height ?? '350px',
        justifyContent: justifyContent ?? 'flex-start',
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
    </Stack>
  )
}

export default ChartDynamic
