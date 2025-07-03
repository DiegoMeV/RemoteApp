import { Grid, Skeleton } from '@mui/material'
import { CardHeader, ChartDynamic } from '@/lib'

const ViewResultCards = ({
  optionsDonutAlertByStatus,
  serieDonutAlertByStatus,
  isPending,
  errorApi,
  dataCards,
}) => {
  return (
    <Grid
      container
      spacing={2}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Grid
        item
        container
        lg={6}
        spacing={3}
      >
        {dataCards.map((card, index) => (
          <Grid
            key={index}
            item
            xs={12}
            md={card.md}
            xl={card.xl}
          >
            {isPending ? (
              <Skeleton
                variant='rectangular'
                height={60}
              />
            ) : (
              <CardHeader
                key={index}
                info={card}
                sxCard={{
                  m: 2,
                  boxShadow: 3,
                  background: 'linear-gradient(135deg, #1a73e8 70%, #ffffff 50%)',
                }}
                sxTitle={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'white' }}
                sxSubHeader={{ color: 'rgba(255, 255, 255, 0.7)' }}
              />
            )}
          </Grid>
        ))}
      </Grid>
      <Grid
        item
        lg={6}
      >
        {isPending ? (
          <Skeleton
            variant='rectangular'
            height={220}
          />
        ) : errorApi ? (
          'Ocurrió un error '
        ) : (
          <ChartDynamic
            options={optionsDonutAlertByStatus}
            series={serieDonutAlertByStatus ?? []}
            height={350}
            type='donut'
          />
        )}
      </Grid>
    </Grid>
  )
}

export default ViewResultCards
