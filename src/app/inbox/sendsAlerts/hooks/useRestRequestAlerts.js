import { MagicString, useCreateSigedoc, useMutationDynamicBaseUrl } from '@/lib'
import toast from 'react-hot-toast'

const useRestRequestAlerts = ({
  idProcess,
  idActivity,
  navigate,
  editionProccessBody,
  editProcess,
  setActiveStep,
}) => {
  const onSuccessSigedoc = (response) => {
    if (response?.data?.errores) {
      toast.error(response?.data?.errores?.mensajeError ?? '')
      return
    }
    toast.success(response?.data?.documentoComunicacion?.mensaje ?? '')
    const SIGEDOC = response?.data?.documentoComunicacion ?? {}
    const body = editionProccessBody(SIGEDOC)
    editProcess({ body })
    setActiveStep(3)
  }
  const onErrorEvent = (err) => {
    if (err) {
      toast.error(err?.response?.data?.error ?? '')
      return
    }
    toast.error('Ha ocurrido un error')
  }

  const { mutateAsync: generateSigedoc, isPending: loadingSigedoc } = useCreateSigedoc({
    onSuccess: onSuccessSigedoc,
    onError: onErrorEvent,
  })

  const { mutateAsync: startTrackingProcess } = useMutationDynamicBaseUrl({
    isCompanyRequest: true,
    baseKey: 'urlProcess',
    url: `/apps-specific/alerts/${idProcess}/start-tracking-process`,
    onSuccess: async () => {
      toast.success(MagicString.GENERAL.SUCCESS_MESSAGE)
      navigate('/inbox')
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? MagicString.GENERAL.ERROR_MESSAGE)
    },
  })

  const { mutateAsync: updateActivity, isPending: loadingActivityUpdate } =
    useMutationDynamicBaseUrl({
      url: `/processes/${idProcess}/activities/${idActivity}`,
      method: 'put',
      isCompanyRequest: true,
      baseKey: 'urlProcess',
      onSuccess: async () => {
        await startTrackingProcess()
        toast.success(MagicString.GENERAL.SUCCESS_MESSAGE)
        navigate('/inbox')
      },
      onError: (e) => {
        toast.error(e?.response?.data?.error ?? MagicString.GENERAL.ERROR_MESSAGE)
        return
      },
    })

  return { generateSigedoc, loadingSigedoc, updateActivity, loadingActivityUpdate }
}

export default useRestRequestAlerts
