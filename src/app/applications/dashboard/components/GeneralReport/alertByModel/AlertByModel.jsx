import { useStoreState } from 'easy-peasy'
import { ViewAlertByModel } from './view'
import { optionsColumn } from '@/app/dashboard/func'
import { removeUndefinedAndNullValues, useGetAnalyticsModule } from '@/lib'
import toast from 'react-hot-toast'
import { useEffect } from 'react'

const AlertByModel = ({ params }) => {
  const dark = useStoreState((state) => state.darkTheme.dark)
  const {
    mutateAsync: getCountAlert,
    isPending,
    data: infoAlertByModel,
  } = useGetAnalyticsModule({
    onError: (error) => {
      toast.error(error.response?.data?.error ?? 'Error al cargar las alertas por modelo')
    },
  })

  useEffect(() => {
    getCountAlert({ qry: `/alertasPorModelo?${params}`, type: 'alertasPorModelo' })
  }, [getCountAlert, params])
  const labels = infoAlertByModel?.result.data?.labels ?? []
  const labelsFiltered = removeUndefinedAndNullValues(labels)
  const options = optionsColumn(dark, labelsFiltered)
  return (
    <ViewAlertByModel
      options={options}
      series={infoAlertByModel?.result.data?.series ?? []}
      isPending={isPending}
    />
  )
}

export default AlertByModel
