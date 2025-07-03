import { useMutationDynamicBaseUrl } from '@/lib'
import { useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const useApis = ({ setSelectedRowKeys }) => {
  const queryClient = useQueryClient()
  const { mutateAsync: transferExpedient, isPending: isPendingTransfer } =
    useMutationDynamicBaseUrl({
      baseKey: 'urlProcess',
      isCompanyRequest: true,
      url: '/tools/process-transfer/transfer-activities',
      method: 'POST',
      onSuccess: () => {
        queryClient.invalidateQueries([`/tools/process-transfer/pending-activities`])
        setSelectedRowKeys([])
        toast.success('Se han transferido los procesos seleccionados correctamente')
      },
      onError: (e) => {
        toast.error(e?.response?.data?.error)
      },
    })
  return { transferExpedient, isPendingTransfer }
}

export default useApis
