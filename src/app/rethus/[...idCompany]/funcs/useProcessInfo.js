import { useMutationDynamicBaseUrl, MagicString } from '@/lib'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export const useProcessInfo = (idCompany, setInfoProcessSelected, setValue) => {
  const navigate = useNavigate()

  const {
    mutateAsync: getProcessInfo,
    isPending: loadingProcessInfo,
    data: infoProcess,
  } = useMutationDynamicBaseUrl({
    url: `/processes`,
    isCompanyRequest: true,
    baseKey: 'urlProcess',
    method: 'get',
    companyId: idCompany,
    onSuccess: (response) => {
      setInfoProcessSelected(response?.data?.[0])
      setValue('type_process', response?.data?.[0]?.ProcessType)
      if (Array.isArray(response?.data?.[0]?.processData?.additionalData)) {
        response?.data?.[0]?.processData?.additionalData?.forEach((element) => {
          setValue(element.id, element.value)
        })
      } else {
        Object.entries(response?.data?.[0]?.processData?.additionalData || {}).forEach(
          ([key, value]) => {
            setValue(key, value)
          }
        )
      }
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? MagicString.GENERAL.ERROR_MESSAGE)
      navigate(`/rethus/${idCompany}`)
    },
  })

  return { getProcessInfo, loadingProcessInfo, infoProcess }
}
