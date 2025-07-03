import { MagicString, useMutationDynamicBaseUrl } from '@/lib'
import toast from 'react-hot-toast'

export const useUserProcess = ({ idCompany, getValues, createProcess }) => {
  const { type_process, nroResolucion, fechaResolucion } = getValues()
  const infoProcess = {
    idProcessType: type_process?.id,
    processData: { additionalData: { nroResolucion, fechaResolucion } },
  }
  const {
    mutateAsync: userProcess,
    isPending: loadingUserProcess,
    data: infoUserProcess,
  } = useMutationDynamicBaseUrl({
    url: `/apps-specific/rethus/peticionario`,
    isCompanyRequest: true,
    baseKey: 'urlProcess',
    method: 'get',
    companyId: idCompany,
    onSuccess: (response) => {
      if (response?.data?.[0]?.Process?.identifier) {
        toast.error(
          `Ya existe un registro con el mismo programa en el sistema (${response?.data?.[0]?.Process?.identifier})`
        )
        return
      }
      createProcess({ body: infoProcess })
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? MagicString.GENERAL.ERROR_MESSAGE)
    },
  })

  return { userProcess, loadingUserProcess, infoUserProcess }
}
