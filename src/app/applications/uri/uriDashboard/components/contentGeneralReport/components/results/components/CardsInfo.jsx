import { CardHeader, formatColombianMoney, useQueryDynamicApi } from '@/lib'
import { Grid, Skeleton } from '@mui/material'

const CardsInfo = ({ qryParams }) => {
  const {
    data: ariCount,
    isLoading: loadingAri,
    isError: errorAri,
  } = useQueryDynamicApi({
    baseKey: 'urlCgr',
    url: `/analytics/cantidadAri?${qryParams}`,
    isCompanyRequest: true,
  })
  const {
    data: ejectCount,
    isLoading: loadingEject,
    isError: errorEject,
  } = useQueryDynamicApi({
    baseKey: 'urlCgr',
    url: `/analytics/cantidadEjecutores?${qryParams}`,
    isCompanyRequest: true,
  })
  const {
    data: meetCount,
    isLoading: loadingMeet,
    isError: errorMeet,
  } = useQueryDynamicApi({
    baseKey: 'urlCgr',
    url: `/analytics/cantidadReuniones?${qryParams}`,
    isCompanyRequest: true,
  })
  const {
    data: valueFollow,
    isLoading: loadingValue,
    isError: errorValue,
  } = useQueryDynamicApi({
    baseKey: 'urlCgr',
    url: `/analytics/valorSeguimiento?${qryParams}`,
    isCompanyRequest: true,
  })

  const dataCards = [
    {
      title: 'Cantidad ARI',
      value: errorAri ? 'Error al cargar información' : ariCount?.data?.[0]?.cantidad_total,
      md: 6,
      xl: 3,
    },
    {
      title: 'Ejecutores',
      value: errorEject ? 'Error al cargar información' : ejectCount?.data?.[0]?.cantidad_total,
      xl: 3,
      md: 6,
    },
    {
      title: 'Reuniones',
      value: errorMeet ? 'Error al cargar información' : meetCount?.data?.[0]?.cantidad_total,
      xl: 3,
      md: 6,
    },
    {
      title: 'Valor Seguimientos',
      value: errorValue
        ? 'Error al cargar información'
        : formatColombianMoney(valueFollow?.data?.[0]?.valor_total),
      xl: 3,
      md: 6,
    },
  ]
  const loadingCards = loadingAri || loadingEject || loadingMeet || loadingValue
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
          {loadingCards ? (
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
  )
}

export default CardsInfo
