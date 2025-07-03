import { Box, Grid, Skeleton } from '@mui/material'
import { FormFiltersIndicators } from '.'
import { ChartContainer, ChartDynamic, baseUrls, useGetAnalyticsMutation } from '@/lib'
import { generateSeries, optionsColumnsChart, optionsRowsChart } from '../../../../dashboard/func'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import optionsDonutRequestManagement from '@/app/dashboard/func/optionsDonutRequestManagement'

const ViewManagementIndicators = () => {
  const [infoCharts, setInfoCharts] = useState(null)
  const { mutateAsync: filteringData, isPending: loadingFilter } = useGetAnalyticsMutation({
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? 'Error al filtrar con esos datos')
    },
  })
  useEffect(() => {
    filteringData({
      type: 'processes-by-complexity',
      setValue: setInfoCharts,
      qryParam: `wholeCompany=true&idGroup=${baseUrls['urlGroupReq']}`,
    })
    filteringData({
      type: 'processes-by-origin-office',
      setValue: setInfoCharts,
      qryParam: `wholeCompany=true&idGroup=${baseUrls['urlGroupReq']}`,
    })
    filteringData({
      type: 'processes-by-use-info',
      setValue: setInfoCharts,
      qryParam: `wholeCompany=true&idGroup=${baseUrls['urlGroupReq']}`,
    })
    filteringData({
      type: 'processes-by-req-type',
      setValue: setInfoCharts,
      qryParam: `wholeCompany=true&idGroup=${baseUrls['urlGroupReq']}`,
    })
    filteringData({
      type: 'processes-by-analyst',
      setValue: setInfoCharts,
      qryParam: `wholeCompany=true&idGroup=${baseUrls['urlGroupReq']}`,
    })
  }, [filteringData])

  const { optionsDonut } = optionsDonutRequestManagement({
    infoCharts,
    type: 'processes-by-complexity',
  })
  const { columnsChartIndicators } = optionsColumnsChart({ infoCharts })
  const { chartbarInformation } = optionsRowsChart({ infoCharts, type: 'processes-by-use-info' })
  const { chartbarInformation: chartbarTypeRequest } = optionsRowsChart({
    infoCharts,
    type: 'processes-by-req-type',
  })
  const { optionsDonut: chartBarRequest } = optionsDonutRequestManagement({
    infoCharts,
    type: 'processes-by-analyst',
  })

  const seriesDonut = infoCharts?.['processes-by-complexity']?.map(({ count = 0 }) => count)
  const seriesBarDelegada = generateSeries('Procesos', infoCharts?.['processes-by-origin-office'])
  const seriesBarUsing = generateSeries('Procesos', infoCharts?.['processes-by-use-info'])
  const seriesBarTypeRequest = generateSeries('Procesos', infoCharts?.['processes-by-req-type'])
  const seriesBarAnalyst = infoCharts?.['processes-by-analyst']?.map(({ count = 0 }) => count)

  const indicators = [
    {
      title: 'Complejidad de la Respuesta',
      type: 'donut',
      series: seriesDonut || [''],
      options: optionsDonut || {},
      height: '600px',
      xl: 6,
      md: 12,
    },
    {
      title: 'Asignación de solicitudes',
      type: 'donut',
      series: seriesBarAnalyst || [''],
      options: chartBarRequest || {},
      xl: 6,
      md: 12,
      height: '600px',
    },
    {
      title: 'Tipo de Solicitud',
      type: 'bar',
      series: seriesBarTypeRequest || [''],
      options: chartbarTypeRequest || {},
      xl: 6,
      md: 12,
      height: '600px',
    },
    {
      title: 'Uso de la información',
      type: 'bar',
      series: seriesBarUsing || [''],
      options: chartbarInformation || {},
      xl: 6,
      md: 12,
      height: '600px',
    },
    {
      title: 'Delegada o entidad solicitante',
      type: 'bar',
      series: seriesBarDelegada || [''],
      options: columnsChartIndicators || {},
      height: '400px',
      md: 12,
    },
  ]
  return (
    <Grid
      container
      spacing={5}
    >
      <Grid
        item
        xs={12}
      >
        <FormFiltersIndicators
          filteringData={filteringData}
          setInfoCharts={setInfoCharts}
        />
      </Grid>

      {indicators.map((indicator, index) => (
        <Grid
          key={index}
          item
          xs={12}
          md={indicator.md}
          xl={indicator.xl}
        >
          <ChartContainer title={indicator.title}>
            <Box
              sx={{ height: '100%' }}
              p={3}
            >
              {loadingFilter ? (
                <Skeleton
                  variant='rectangular'
                  height={200}
                />
              ) : (
                (indicator.options || indicator.series) && (
                  <ChartDynamic
                    options={indicator.options}
                    series={indicator.series}
                    type={indicator.type ?? ''}
                    height={indicator.height}
                  />
                )
              )}
            </Box>
          </ChartContainer>
        </Grid>
      ))}
    </Grid>
  )
}

export default ViewManagementIndicators
