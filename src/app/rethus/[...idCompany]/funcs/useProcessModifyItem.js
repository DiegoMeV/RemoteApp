import { useMutationDynamicBaseUrl } from '@/lib'
import toast from 'react-hot-toast'

export const useProcessModifyItem = (idActivityAction, idCompany) => {
  const qry = idActivityAction ? `${idActivityAction}/items` : ''
  const { mutateAsync: modifyItemInformation, isPending: loadingItemCreation } =
    useMutationDynamicBaseUrl({
      isCompanyRequest: true,
      baseKey: 'urlProcess',
      companyId: idCompany,
      url: `/processes/activity-actions/${qry}`,
      onSuccess: () => {
        toast.success('Elemento modificado correctamente')
      },
      onError: (e) => {
        toast.error(e?.response?.data?.error ?? 'Error al agregar elemento')
      },
    })

  return { modifyItemInformation, loadingItemCreation }
}
