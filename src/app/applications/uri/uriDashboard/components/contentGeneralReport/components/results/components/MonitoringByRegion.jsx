import { ChartDynamic, optionsBar, removeUndefinedAndNullValues } from '@/lib'
import { Skeleton } from '@mui/material'
import { useStoreState } from 'easy-peasy'
import { useEffect } from 'react'

const MonitoringByRegion = ({
  infoMonitoringByRegion,
  mutateMonitoringByRegion,
  loadingMonitoringByRegion,
  qryParams,
}) => {
  useEffect(() => {
    mutateMonitoringByRegion({ qry: `?${qryParams}` })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dark = useStoreState((state) => state.darkTheme.dark)
  const labels = infoMonitoringByRegion?.data?.labels ?? ['']
  const labelsFiltered = removeUndefinedAndNullValues(labels)
  const title = 'Número de seguimientos \n permanente por región'
  const optionsDonutActiveAct = optionsBar(dark, labelsFiltered, title)
  const seriesDonutActiveAct = infoMonitoringByRegion?.data?.series ?? []
  return (
    <>
      {loadingMonitoringByRegion ? (
        <Skeleton
          variant='rectangular'
          fullWidth
          height={300}
        />
      ) : (
        <ChartDynamic
          options={optionsDonutActiveAct}
          series={seriesDonutActiveAct}
          height={350}
          type='bar'
        />
      )}
    </>
  )
}

export default MonitoringByRegion
