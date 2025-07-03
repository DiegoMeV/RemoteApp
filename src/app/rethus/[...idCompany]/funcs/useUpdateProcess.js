import { useMutationDynamicBaseUrl } from '@/lib'
import toast from 'react-hot-toast'

export const useUpdateProcess = ({ idCompany, idProcess, updateActivity }) => {
  const { mutateAsync: updateProcess, isPending: isUpdatingProcess } = useMutationDynamicBaseUrl({
    baseKey: 'urlProcess',
    url: `/processes/${idProcess}`,
    isCompanyRequest: true,
    companyId: idCompany,
    method: 'PUT',
    onSuccess: () => {
      updateActivity({
        body: {
          status: 'COMPLETED',
        },
      })
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? 'Error crear el registro')
    },
  })
  return { updateProcess, isUpdatingProcess }
}
