import { Box, Typography } from '@mui/material'
import {} from 'react'
import { ContentGeneralReport } from '../components'
import { NoAccessCard } from '@/lib'
import { AccessControl } from '@/libV4'

const ViewDashboardAlert = () => {
  return (
    <>
      <Box
        bgcolor='backgroundGrey2'
        borderRadius='20px 20px 0 0'
        p={2}
      >
        <Typography
          variant='h5'
          color='primary'
          textAlign='center'
        >
          Reporte General
        </Typography>
      </Box>
      <Box
        bgcolor='backgroundGrey1'
        height='calc(100vh - 100px)'
        borderRadius='0 0 20px 20px'
        p={2}
        overflow='auto'
      >
        <AccessControl
          privilege='cgr.alertas.visualizar_dashboard'
          nodeContent={<NoAccessCard />}
        >
          <ContentGeneralReport />
        </AccessControl>
      </Box>
    </>
  )
}

export default ViewDashboardAlert
