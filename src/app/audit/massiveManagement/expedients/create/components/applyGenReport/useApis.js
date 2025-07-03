import { useMutationDynamicBaseUrl } from '@/lib'
import toast from 'react-hot-toast'

export const useApis = ({ idMassiveActivity, getMassiveActivitiesQueue }) => {
  const { mutateAsync: manageMassiveExpedients, isPending: isPendingManageMassiveExpedients } =
    useMutationDynamicBaseUrl({
      baseKey: 'urlFiscalizacion',
      url: `/massive-activities/${idMassiveActivity}/execute`,
      isCompanyRequest: true,
      method: 'POST',
      onSuccess: () => {
        getMassiveActivitiesQueue({ qry: `/MASSIVE_APPLY_ACTIVITY/${idMassiveActivity}` })
      },
      onError: (e) => {
        toast.error(e?.response?.data?.error || 'Ha ocurrido un error')
      },
    })
  return { manageMassiveExpedients, isPendingManageMassiveExpedients }
}
