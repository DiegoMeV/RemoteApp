import { ChartDynamic, optionsPie, removeUndefinedAndNullValues } from '@/lib'
import { Skeleton } from '@mui/material'
import { useStoreState } from 'easy-peasy'
import { useEffect } from 'react'

const SectorPie = ({ infoSector, mutateSector = () => {}, loadingSector, qryParams }) => {
  useEffect(() => {
    mutateSector({ qry: `?${qryParams}` })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dark = useStoreState((state) => state.darkTheme.dark)
  const labels = infoSector?.data?.labels ?? ['']
  const labelsFiltered = removeUndefinedAndNullValues(labels)
  const title = 'Sector'
  const optionsDonutActiveActions = optionsPie(dark, labelsFiltered, title)
  const seriesDonutActiveActions = infoSector?.data?.serieDonutSectorAlertado ?? []
  return (
    <>
      {loadingSector ? (
        <Skeleton
          variant='rectangular'
          fullWidth
          height={300}
        />
      ) : (
        <ChartDynamic
          options={optionsDonutActiveActions}
          series={seriesDonutActiveActions}
          height={500}
          type='pie'
        />
      )}
    </>
  )
}

export default SectorPie
