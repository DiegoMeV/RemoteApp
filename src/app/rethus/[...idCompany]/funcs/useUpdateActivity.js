import { MagicString, useMutationDynamicBaseUrl } from '@/lib'
import toast from 'react-hot-toast'

export const useUpdateActivity = ({ idProcess, idActivity, idCompany, setActiveStep }) => {
  const { mutateAsync: updateActivity, isPending: loadingActivityUpdate } =
    useMutationDynamicBaseUrl({
      url: `/processes/${idProcess}/activities/${idActivity}`,
      method: 'put',
      isCompanyRequest: true,
      companyId: idCompany,
      baseKey: 'urlProcess',
      onSuccess: () => {
        toast.success(MagicString.GENERAL.SUCCESS_MESSAGE)
        setActiveStep(6)
      },
      onError: (e) => {
        toast.error(e?.response?.data?.error ?? MagicString.GENERAL.ERROR_MESSAGE)
        setActiveStep(0)
        return
      },
    })
  return { updateActivity, loadingActivityUpdate }
}
