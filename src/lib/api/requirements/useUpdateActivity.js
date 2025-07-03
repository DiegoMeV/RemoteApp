import toast from 'react-hot-toast'
import { useMutationDynamicBaseUrl } from '../useDynamicApi'
import { MagicString } from '@/lib/constants'

const useUpdateActivity = ({ idProcess, idActivity, companyData, queryClient }) => {
  const { mutateAsync: updateActivity, isPending: loadingActivityUpdate } =
    useMutationDynamicBaseUrl({
      url: `/processes/${idProcess}/activities/${idActivity}`,
      method: 'put',
      isCompanyRequest: true,
      baseKey: 'urlProcess',
      onSuccess: () => {
        toast.success(MagicString.GENERAL.SUCCESS_MESSAGE)
        queryClient.invalidateQueries([`/${companyData?.companyId}/inbox/summary`])
      },
      onError: (e) => {
        toast.error(e?.response?.data?.error ?? MagicString.GENERAL.ERROR_MESSAGE)
        return
      },
    })
  return { updateActivity, loadingActivityUpdate }
}

export default useUpdateActivity
