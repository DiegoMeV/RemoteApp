import { Card, CardContent, Grid, Typography } from '@mui/material'

const CardInfoSummaryDescription = ({ basicDataProcess }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography
          variant='h5'
          color='primary'
          pb={2}
        >
          Datos básicos del proceso
        </Typography>
        <Grid
          container
          gap={2}
        >
          {basicDataProcess?.map(
            (data) =>
              data.value && (
                <>
                  <Grid
                    item
                    xs={3}
                  >
                    <Typography fontWeight={'bold'}>{data.name}:</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={8}
                    maxHeight='200px'
                    overflow='auto'
                  >
                    <Typography sx={{ wordWrap: 'break-word' }}>{data.value}</Typography>
                  </Grid>
                </>
              )
          )}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CardInfoSummaryDescription
