import { Grid } from '@mui/material'
import { useConfigChartsInfoAnalyticsByYear } from '../../../../dashboard/func'
import { ChartContainer, ChartDynamic, Loading } from '@/lib'

const ViewAnalyticsInformation = () => {
  const { byYear, loading } = useConfigChartsInfoAnalyticsByYear()

  return (
    <Grid
      container
      spacing={5}
    >
      {byYear?.map((indicator, index) => (
        <Grid
          key={index}
          item
          xs={12}
          md={indicator.md}
        >
          <ChartContainer title={indicator.title}>
            {loading ? (
              <Loading />
            ) : (
              <ChartDynamic
                options={indicator.options}
                series={indicator.series}
                type={indicator.type ?? ''}
                height={indicator.height}
              />
            )}
          </ChartContainer>
        </Grid>
      ))}
    </Grid>
  )
}

export default ViewAnalyticsInformation
