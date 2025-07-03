import { useGetAnalyticsModule } from '@/lib'
import { ViewDetailAlert } from './view'
import toast from 'react-hot-toast'
import { useEffect } from 'react'

const DetailAlert = ({ params }) => {
  const {
    mutateAsync: getAlertDetail,
    isPending,
    data: infoAlerts,
  } = useGetAnalyticsModule({
    onError: (error) => {
      toast.error(error.response?.data?.error ?? 'Error al cargar las alertas por detalle')
    },
  })

  useEffect(() => {
    getAlertDetail({ qry: `/alertasPorDetalle?${params}`, type: 'alertasPorDetalle' })
  }, [getAlertDetail, params])
  return (
    <ViewDetailAlert
      loading={isPending}
      infoAlerts={infoAlerts?.result?.data}
    />
  )
}

export default DetailAlert
