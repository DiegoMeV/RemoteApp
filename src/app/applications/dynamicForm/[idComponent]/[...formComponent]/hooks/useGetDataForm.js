import { useMutationDynamicBaseUrl } from '@/lib'
import { useStoreState } from 'easy-peasy'
import toast from 'react-hot-toast'

const useGetDataForm = (props) => {
  const { companyId, formComponent, eventSuccess = () => {} } = props
  const userData = useStoreState((state) => state.user.userData)
  const idCompany = companyId ?? userData?.companies?.[0]?.companyId
  const { mutateAsync: getDataEdit, isPending: isGetDataEditPending } = useMutationDynamicBaseUrl({
    baseKey: 'urlApps',
    url: `/runtime/${idCompany}/form/${formComponent}/getUnique`,
    method: 'post',
    isCompanyRequest: false,
    onSuccess: (e) => {
      if (e?.success) {
        eventSuccess(e)
      }
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })

  return { getDataEdit, isGetDataEditPending }
}

export default useGetDataForm
