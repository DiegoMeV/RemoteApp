import toast from 'react-hot-toast'
import { useMutationDynamicBaseUrl, isEmpty } from '@/lib'
import { useStoreState } from 'easy-peasy'

const usePushDataForm = ({
  pushSuccess = () => {},
  companyId,
  formComponent,
  queryParamsPks,
  dataRow,
  isDirectForm = false,
}) => {
  const userData = useStoreState((state) => state.user.userData)
  const idCompany = companyId ?? userData?.companies?.[0]?.companyId
  const { mutateAsync: pushDataForm, isPending: isPendingPushDataForm } = useMutationDynamicBaseUrl(
    {
      baseKey: 'urlApps',
      url: `/runtime/${idCompany}/form/${formComponent}`,
      method: (!isEmpty(queryParamsPks) && !dataRow?.isNew) || isDirectForm ? 'put' : 'post',
      isCompanyRequest: false,
      onSuccess: (e) => {
        if (e?.success) {
          !isDirectForm && pushSuccess(e?.data)
          toast.success('Formulario enviado con éxito')
        }
      },
      onError: (e) => {
        toast.error(e?.error ?? 'Error al enviar formulario')
      },
    }
  )

  return { pushDataForm, isPendingPushDataForm }
}

export default usePushDataForm
