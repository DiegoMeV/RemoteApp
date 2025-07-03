import { MagicString, useMutationDynamicBaseUrl } from '@/lib'
import toast from 'react-hot-toast'

const useRestRequestProcess = ({ idProcess, idActivity, navigate }) => {
  const { mutateAsync: updateActivity, isPending: loadingActivityUpdate } =
    useMutationDynamicBaseUrl({
      url: `/processes/${idProcess}/activities/${idActivity}`,
      method: 'put',
      isCompanyRequest: true,
      baseKey: 'urlProcess',
      onSuccess: async () => {
        toast.success(MagicString.GENERAL.SUCCESS_MESSAGE)
        navigate('/inbox')
      },
      onError: (e) => {
        toast.error(e?.response?.data?.error ?? MagicString.GENERAL.ERROR_MESSAGE)
        return
      },
    })

  return { updateActivity, loadingActivityUpdate }
}

export default useRestRequestProcess
