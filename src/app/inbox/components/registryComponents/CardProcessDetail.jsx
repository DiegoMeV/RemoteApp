import { Card, CardContent, Grid, Typography } from '@mui/material'

const CardProcessDetail = ({ infoProcess, processGroupsData }) => {
  const headers = ['Grupo de Aplicación', 'Dependencia', 'Proceso', 'Descripción']

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography
          variant='h5'
          color='primary'
          pb={2}
        >
          Detalles del proceso
        </Typography>
        <Grid
          container
          gap={2}
        >
          <Grid
            item
            xs={3}
          >
            {headers.map(
              (header, index) =>
                (header !== 'Descripción' ||
                  (header === 'Descripción' && infoProcess?.descriptionProcess)) && (
                  <Typography
                    key={index}
                    fontWeight={'bold'}
                  >
                    {header}:
                  </Typography>
                )
            )}
          </Grid>
          <Grid
            item
            xs={8}
          >
            <Typography>{processGroupsData?.name ?? ''}</Typography>
            <Typography>{infoProcess?.dependenciesSelected?.name ?? ''}</Typography>
            <Typography>{infoProcess?.processSelected?.name ?? ''}</Typography>
            {infoProcess?.descriptionProcess && (
              <Typography
                sx={{ wordWrap: 'break-word' }}
                overflow={'auto'}
              >
                {infoProcess?.descriptionProcess}
              </Typography>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CardProcessDetail
