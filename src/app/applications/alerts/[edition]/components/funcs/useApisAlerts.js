import { useCreateAlerts, useUpdateAlert } from '@/lib'
import { useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export const useApisAlerts = ({
  infoAlert,
  handleUpdateView,
  handleSetAlertToProcess,
  isModal,
}) => {
  const queryClient = useQueryClient()
  const { mutateAsync: createAlert, isPending: loadingCreateAlert } = useCreateAlerts({
    onSuccess: (data) => {
      toast.success('Alerta creada con éxito')
      queryClient.invalidateQueries('/alertas')
      handleUpdateView(data)
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error || 'Error al crear la alerta')
    },
  })
  const { mutateAsync: updateAlert, isPending: loadingUpdateAlert } = useUpdateAlert({
    id: infoAlert?.id,
    onSuccess: (response) => {
      toast.success('Alerta actualizada con éxito')
      queryClient.invalidateQueries('/alertas')
      if (isModal) {
        handleSetAlertToProcess(response)
      }
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error || 'Error al actualizar la alerta')
    },
  })
  const loading = loadingCreateAlert || loadingUpdateAlert
  return { createAlert, updateAlert, loading }
}
