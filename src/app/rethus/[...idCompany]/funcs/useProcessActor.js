import { useMutationDynamicBaseUrl, MagicString } from '@/lib'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export const useProcessActor = ({ idCompany, setInfoActors, setValue }) => {
  const navigate = useNavigate()

  const {
    mutateAsync: getProcessActor,
    isPending: loadingProcessActor,
    reset,
  } = useMutationDynamicBaseUrl({
    url: `/processes`,
    isCompanyRequest: true,
    baseKey: 'urlProcess',
    method: 'get',
    companyId: idCompany,
    onSuccess: (response) => {
      setInfoActors(response?.data?.[0])
      if (Array.isArray(response?.data?.[0]?.processData?.additionalData)) {
        response?.data?.[0]?.actorData?.additionalData?.forEach((element) => {
          setValue(element.id, element.value)
        })
      } else {
        Object.entries(response?.data?.[0]?.actorData?.additionalData || {}).forEach(
          ([key, value]) => {
            setValue(key, value)
            if (key === 'email') {
              setValue('emailConfirm', value)
            }
          }
        )
      }
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? MagicString.GENERAL.ERROR_MESSAGE)
      navigate(`/rethus/${idCompany}`)
    },
  })

  return { getProcessActor, loadingProcessActor, reset }
}
