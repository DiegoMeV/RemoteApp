import { useMutationDynamicBaseUrl } from '@/lib'
import toast from 'react-hot-toast'

export const useUpdateActivityAction = ({
  idCompany,
  idProcess,
  idActivity,
  refetchInfoProcess,
  modifyItemInformation,
  infoDocument,
}) => {
  const { mutateAsync: crateActivityAction, isPending: isPendingUpdateProcess } =
    useMutationDynamicBaseUrl({
      baseKey: 'urlProcess',
      url: `/processes/${idProcess}/activities/${idActivity}/actions`,
      isCompanyRequest: true,
      companyId: idCompany,
      onSuccess: (response) => {
        refetchInfoProcess()
        modifyItemInformation({ qry: `${response?.data?.id}/items`, body: infoDocument })
      },
      onError: (e) => {
        toast.error(e?.response?.data?.error ?? 'Error al crear la acción')
      },
    })
  return { crateActivityAction, isPendingUpdateProcess }
}
