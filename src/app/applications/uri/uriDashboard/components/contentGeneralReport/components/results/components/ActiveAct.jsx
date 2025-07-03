import { ChartDynamic, optionsDonuts, removeUndefinedAndNullValues } from '@/lib'
import { Skeleton } from '@mui/material'
import { useStoreState } from 'easy-peasy'
import { useEffect } from 'react'

const ActiveAct = ({ infoActiveAcct, mutateActiveAcct, loadingActiveAcct, qryParams }) => {
  useEffect(() => {
    mutateActiveAcct({ qry: `?${qryParams}` })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dark = useStoreState((state) => state.darkTheme.dark)
  const labels = infoActiveAcct?.data?.labels ?? ['']
  const labelsFiltered = removeUndefinedAndNullValues(labels)
  const title = 'Actuaciones activas'
  const optionsDonutActiveAct = optionsDonuts(dark, labelsFiltered, title)
  const seriesDonutActiveAct = infoActiveAcct?.data?.serieDonutActActiva ?? []
  return (
    <>
      {loadingActiveAcct ? (
        <Skeleton
          variant='rectangular'
          fullWidth
          height={300}
        />
      ) : (
        <ChartDynamic
          options={optionsDonutActiveAct}
          series={seriesDonutActiveAct}
          height={500}
          type='donut'
        />
      )}
    </>
  )
}

export default ActiveAct
