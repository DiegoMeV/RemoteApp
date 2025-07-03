import { useMutationDynamicBaseUrl } from '@/libV4'
import toast from 'react-hot-toast'

export const useExecuteUpdate = ({ shema, tableName, onSuccessFunc }) => {
  const { mutateAsync: executeUpdate, isPending: isPendingExecute } = useMutationDynamicBaseUrl({
    url: `/nomina/executeUpdate/${shema}/${tableName}`,
    baseKey: 'urlNomina',
    isCompanyRequest: true,
    method: 'put',
    onSuccess: (response) => {
      onSuccessFunc && onSuccessFunc(response)
      toast.success(response?.msg || `Actualización exitosa`)
    },
    onError: (e) => {
      toast.error(e?.error || `Error al actualizar`)
    },
  })

  return {
    executeUpdate,
    isPendingExecute,
  }
}
