import { Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ApexCharts from 'react-apexcharts'

const CardCharts = ({ number, title, options, series, type, backgroundColor }) => {
  const navigate = useNavigate()
  return (
    <Box
      className={`grid grid-cols-12 items-end gap-2 p-4 rounded-lg cursor-pointer h-[150px] ${
        backgroundColor ?? ''
      }`}
      onDoubleClick={() => navigate('/inbox')}
    >
      <div className='col-span-4'>
        <Typography
          variant='h3'
          color='#00000099'
        >
          {number}
        </Typography>
        <Typography
          variant='h5'
          color='#00000099'
        >
          {title}
        </Typography>
      </div>
      <div className='col-span-8'>
        <ApexCharts
          options={options}
          series={series}
          type={type}
          height='120px'
          width='100%'
        />
      </div>
    </Box>
  )
}

export default CardCharts
