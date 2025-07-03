import { MagicString, useMutationDynamicBaseUrl, useQueryDynamicApi } from '@/lib'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useGenerateSticker } from '../../hooks'

const useApis = ({ setActiveStep, activeStep, idProcess, setConfirmModalProcess }) => {
  const navigate = useNavigate()
  const { generateSticker, isPendingGenerateSticker, newBuffer } = useGenerateSticker({
    id: idProcess,
  })

  const { mutateAsync: createProcess } = useMutationDynamicBaseUrl({
    url: '/processes/mode/unnotify',
    baseKey: 'urlProcess',
    isCompanyRequest: true,
    onSuccess: (e) => {
      toast.success('Proceso registrado correctamente.')
      navigate(`/inbox/RegistryInternalCorrespondence?idProcess=${e.data?.id}`)
      setTimeout(() => {
        setActiveStep(activeStep + 1)
      }, 500)
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error || 'Error al registrar el proceso.')
    },
  })
  const { mutateAsync: editProcess } = useMutationDynamicBaseUrl({
    url: `/processes/${idProcess}`,
    baseKey: 'urlProcess',
    isCompanyRequest: true,
    method: 'PUT',
    onSuccess: () => {
      setActiveStep(activeStep + 1)
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error || 'Error al editar el proceso, intente nuevamente.')
    },
  })
  const { data: processInfo, isFetching: loadingInfoProcess } = useQueryDynamicApi({
    url: `/processes/${idProcess}?inclPendingActs=true`,
    baseKey: 'urlProcess',
    isCompanyRequest: true,
    enabled: !!idProcess && idProcess !== 'null',
  })

  const { mutateAsync: updateActivity, isPending: loadingActivityUpdate } =
    useMutationDynamicBaseUrl({
      url: `/processes/${idProcess}/activities/${processInfo?.data?.[0]?.pendingActivities?.[0].id}`,
      method: 'put',
      isCompanyRequest: true,
      baseKey: 'urlProcess',
      enabled: !!processInfo?.pendingActivities?.[0].id,
      onSuccess: () => {
        toast.success(MagicString.GENERAL.SUCCESS_MESSAGE)
        setConfirmModalProcess(true)
      },
      onError: (e) => {
        toast.error(e?.response?.data?.error ?? MagicString.GENERAL.ERROR_MESSAGE)
        return
      },
    })

  const finallyProcess = async () => {
    await generateSticker()
    await updateActivity({
      body: {
        status: 'COMPLETED',
      },
    })
  }
  const loadingProcess = loadingInfoProcess || loadingActivityUpdate || isPendingGenerateSticker

  return {
    createProcess,
    editProcess,
    finallyProcess,
    processInfo,
    sticker: newBuffer,
    loadingProcess,
  }
}

export default useApis
