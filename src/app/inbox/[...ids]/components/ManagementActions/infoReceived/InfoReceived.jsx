import { CustomAccordion } from '@/lib'
import { DescriptionOutlined } from '@mui/icons-material'
import { Box, Grid, Typography } from '@mui/material'
import React from 'react'

const InfoReceived = ({ activityData }) => {
  const info = [
    {
      title: 'Mecanismo por el que se envía la información:',
      value: activityData?.fileStoreType ?? 'No se encontró información.',
    },
    {
      title: 'Detalle de la información enviada:',
      value: activityData?.infoSentDetails ?? 'No se encontró información.',
    },
    {
      title: 'Número Radicado SIGEDOC:',
      value: activityData?.sigedocData?.SIGEDOCcodigoDeSeguimiento ?? 'No se encontró información.',
    },
    {
      title: 'Fecha radicación:',
      value: activityData?.sigedocData?.SIGEDOCfechaRadicacion ?? 'No se encontró información.',
    },
    {
      title: 'Justificación:',
      value: activityData?.comment ?? 'No se encontró información.',
    },
    {
      title: 'Entidad remitente:',
      value: activityData?.EntityData?.name ?? 'No se encontró información.',
    },
  ]
  return (
    <CustomAccordion
      title='Información recibida'
      icon={<DescriptionOutlined color='primary' />}
    >
      <Box
        bgcolor='#fff'
        width='100%'
        p={2}
      >
        <Grid
          container
          spacing={2}
        >
          {info.map((item, index) => (
            <Grid
              item
              xs={6}
              key={index}
            >
              <Typography fontWeight='bold'>{item.title}</Typography>
              <Typography>{item.value}</Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </CustomAccordion>
  )
}

export default InfoReceived
