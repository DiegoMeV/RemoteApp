import { useStoreState } from 'easy-peasy'
import { ViewAlertByActor } from './view'
import { optionsColumn } from '@/app/dashboard/func'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { removeUndefinedAndNullValues, useGetAnalyticsModule } from '@/lib'

const AlertByActor = ({ params }) => {
  const dark = useStoreState((state) => state.darkTheme.dark)
  const {
    mutateAsync: getAlertsByActor,
    isPending,
    data: infoAlertsByActor,
  } = useGetAnalyticsModule({
    onError: (error) => {
      toast.error(error.response?.data?.error ?? 'Error al cargar las alertas por actor')
    },
  })

  useEffect(() => {
    getAlertsByActor({ qry: `/alertasPorDestinatario?${params}`, type: 'alertasPorDestinatario' })
  }, [getAlertsByActor, params])
  const labels = infoAlertsByActor?.result?.data?.labels ?? []
  const labelsFiltered = removeUndefinedAndNullValues(labels)
  const optionsAlertActor = optionsColumn(dark, labelsFiltered)
  const serieAlertActor = infoAlertsByActor?.result?.data?.series ?? []

  return (
    <ViewAlertByActor
      optionsAlertActor={optionsAlertActor}
      serieAlertActor={serieAlertActor}
      isPending={isPending}
    />
  )
}

export default AlertByActor
