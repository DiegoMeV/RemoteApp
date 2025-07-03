import { encodeString, MagicString, useMutationDynamicBaseUrl } from '@/libV4'
import toast from 'react-hot-toast'

export const useExecuteAction = ({ shema, tableName, numIterations, onSuccessFunc }) => {
  const iterations = encodeString(MagicString?.NOMINA?.encodeIterations, numIterations)
  const encodedShema = encodeString(numIterations, shema)
  const encodedTableName = encodeString(numIterations, tableName)
  const { mutateAsync: executeAction, isPending: isPendingExecute } = useMutationDynamicBaseUrl({
    url: `/nomina/executeAction/${encodedShema}/${encodedTableName}/${iterations}`,
    baseKey: 'urlNomina',
    isCompanyRequest: true,
    method: 'post',
    onSuccess: (response) => {
      onSuccessFunc && onSuccessFunc(response)
      !onSuccessFunc && toast.success(response?.msg || `Acción exitosa`)
    },
    onError: (e) => {
      toast.error(e?.error || `Error en la acción`)
    },
  })

  return {
    executeAction,
    isPendingExecute,
  }
}
