import { LoadingMassive } from '@/app/audit/expedient/components'
import { CardInfo } from '@/lib'
import { Box, Divider, Grid, Typography } from '@mui/material'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

const GenerateExpedient = ({ queueInfo }) => {
  useEffect(() => {
    if (queueInfo?.[0]?.status === 'ERROR') {
      toast.error(queueInfo?.[0]?.queueData?.errorMsg ?? 'Error al generar el expediente')
    }
  }, [queueInfo])
  return (
    <Box
      width='100%'
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <CardInfo bgColor='backgroundGrey1'>
        {['QUEUED', 'INPROGRESS'].includes(queueInfo?.[0]?.status) && (
          <LoadingMassive queueInfo={queueInfo} />
        )}
        <Grid
          container
          direction='column'
          spacing={2}
        >
          <Grid item>
            <Typography
              variant='h6'
              align='right'
              color='textSecondary'
            >
              Cantidad
            </Typography>
          </Grid>
          <Divider />
          <Grid
            item
            container
            justifyContent='space-between'
            alignItems='center'
          >
            <Typography
              variant='body1'
              color='textSecondary'
            >
              Expedientes a generar:
            </Typography>
            <Typography
              variant='body1'
              color='primary'
              fontWeight='bold'
            >
              {queueInfo?.[0]?.queueData?.progress?.totalRows || 0}
            </Typography>
          </Grid>
          <Grid
            item
            container
            justifyContent='space-between'
            alignItems='center'
          >
            <Typography
              variant='body1'
              color='textSecondary'
            >
              Expedientes generados:
            </Typography>
            <Typography
              variant='body1'
              color='primary'
              fontWeight='bold'
            >
              {queueInfo?.[0]?.queueData?.progress?.cantProcCreated || 0}
            </Typography>
          </Grid>
        </Grid>
      </CardInfo>
    </Box>
  )
}

export default GenerateExpedient
