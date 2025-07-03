import { CardHeader } from '@/lib'
import { Grid, Skeleton } from '@mui/material'

const CardsInfo = ({ diariINFO }) => {
  const { errorApi, requestDIARI, loadingDIARI } = diariINFO
  const dataCards = [
    {
      title: 'Solicitudes recibidas',
      value: errorApi
        ? 'Error al cargar información'
        : requestDIARI?.data?.[0]?.solicitudes_recibidas ?? 0,
      md: 6,
    },
    {
      title: 'Solicitudes gestionadas',
      value: errorApi
        ? 'Error al cargar información'
        : requestDIARI?.data?.[0]?.solicitudes_gestionadas ?? 0,
      md: 6,
    },
  ]
  return (
    <Grid
      container
      spacing={2}
    >
      {dataCards.map((card, index) => (
        <Grid
          key={index}
          item
          xs={12}
          md={card.md}
          xl={card.xl}
        >
          {loadingDIARI ? (
            <Skeleton
              variant='rectangular'
              height={100}
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
  )
}

export default CardsInfo
