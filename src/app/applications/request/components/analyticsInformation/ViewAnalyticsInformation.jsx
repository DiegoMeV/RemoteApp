import { Box, Grid, Skeleton } from '@mui/material'
import { useConfigChartsInfoAnalyticsByYear } from '../../../../dashboard/func'
import {
  ChartContainer,
  ChartDynamic,
  baseUrls,
  useGetAnalytics,
  useMutationDynamicBaseUrl,
} from '@/lib'
import FormFiltersAnalytics from './FormFiltersAnalytics'
import { useForm } from 'react-hook-form'
import CardsInfo from './CardsInfo'

const ViewAnalyticsInformation = () => {
  const {
    mutateAsync: requestDIARIMutate,
    data: requestDIARI,
    isPending: loadingDIARI,
    isError: errorApi,
  } = useMutationDynamicBaseUrl({
    baseKey: 'urlProcess',
    url: ``,
    isCompanyRequest: true,
    method: 'get',
  })
  const diariINFO = {
    requestDIARI,
    loadingDIARI,
    errorApi,
  }
  const { data: infoProcessesByComplexityGroup, isLoading: isLoadingProcessesByComplexityGroup } =
    useGetAnalytics({
      type: `/processes-by-year?wholeCompany=true&idGroup=${baseUrls['urlGroupReq']}}`,
    })
  const { byYear, loading } = useConfigChartsInfoAnalyticsByYear({
    infoProcessesByComplexityGroup,
    isLoadingProcessesByComplexityGroup,
  })

  const form = useForm()

  return (
    <Grid
      container
      spacing={5}
    >
      <Grid
        item
        xs={12}
      >
        <FormFiltersAnalytics
          form={form}
          requestDIARIMutate={requestDIARIMutate}
        />
      </Grid>
      <Grid
        item
        xs={12}
      >
        <CardsInfo diariINFO={diariINFO} />
      </Grid>
      {byYear?.map((indicator, index) => (
        <Grid
          key={index}
          item
          xs={12}
          md={indicator.md}
        >
          <ChartContainer title={indicator.title}>
            <Box
              sx={{ height: '100%' }}
              p={3}
            >
              {loading ? (
                <Skeleton
                  variant='rectangular'
                  height={450}
                />
              ) : (
                <ChartDynamic
                  options={indicator.options}
                  series={indicator.series}
                  type={indicator.type ?? ''}
                  height={indicator.height}
                />
              )}
            </Box>
          </ChartContainer>
        </Grid>
      ))}
    </Grid>
  )
}

export default ViewAnalyticsInformation
