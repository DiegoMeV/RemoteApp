import { useMutationDynamicBaseUrl, MagicString } from '@/lib'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export const useCreateProcess = ({ idCompany, path, getValues, createActor, infoActors }) => {
  const navigate = useNavigate()
  const dataForm = getValues()
  const keysToExclude = ['type_process', 'nroResolucion', 'fechaResolucion', 'emailConfirm']
  const filteredDataForm = Object.fromEntries(
    Object.entries(dataForm).filter(([key]) => !keysToExclude.includes(key))
  )
  const optimizedRestOfInfo = Object.entries(filteredDataForm).reduce((acc, [key, value]) => {
    acc[key] = typeof value === 'object' && value !== null && value.id ? value.id : value
    return acc
  }, {})

  const bodyActor = {
    actorTypeKey: 'PETICIONARIO',
    actorData: {
      additionalData: optimizedRestOfInfo,
    },
  }

  const { mutateAsync: createProcess, isPending: loadingCreation } = useMutationDynamicBaseUrl({
    url: '/processes/mode/unnotify',
    isCompanyRequest: true,
    baseKey: 'urlProcess',
    companyId: idCompany,
    onSuccess: async (response) => {
      if (!infoActors) {
        await createActor({ qry: `/${response?.data?.id}/actors`, body: bodyActor })
      }
      navigate(`${path}/${response?.data?.id}`)
      toast.success(MagicString.GENERAL.SUCCESS_MESSAGE)
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? MagicString.GENERAL.ERROR_MESSAGE)
    },
  })

  return { createProcess, loadingCreation }
}
