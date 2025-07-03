import { MagicString, useGetProcess, useMutateProcess, useMutationDynamicBaseUrl } from '@/lib'
import toast from 'react-hot-toast'

const useRequestProcessAlerts = ({
  idProcess,
  idGroup,
  activeStep,
  setActiveStep,
  idProccesUpdated,
  setIdOffice,
  setIdProccesUpdated,
  navigate,
}) => {
  const { mutateAsync: getOffice } = useMutationDynamicBaseUrl({
    isCompanyRequest: true,
    baseKey: 'urlUsers',
    url: `/hierarchy`,
    method: 'get',
  })

  const {
    data: processInfo,
    isFetching: loadingProcessInfo,
    isError: errorProcessInfo,
    refetch: refetchProcess,
  } = useGetProcess({
    qry: `/${idProcess}?inclOfficeData=true&inclPendingActs=true`,
    enabled: !!idProcess,
  })

  const { mutateAsync: editProcess, isPending: loadingEditingProcess } = useMutateProcess({
    qry: `/${idProccesUpdated}`,
    method: 'put',
    onSuccess: async () => {
      refetchProcess()
      if (activeStep === 0) {
        setActiveStep(1)
      }
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? MagicString.GENERAL.ERROR_MESSAGE)
    },
  })

  const { mutateAsync: createProcess, isPending: loadingCreationProcess } = useMutateProcess({
    qry: '/mode/unnotify',
    onSuccess: async (response) => {
      setActiveStep(1)
      const idOffice = response?.data?.idOfficeOrigin
      setIdOffice(idOffice)
      toast.success(MagicString.GENERAL.SUCCESS_MESSAGE)
      const idProcess = response?.data?.id
      setIdProccesUpdated(idProcess)
      setTimeout(() => {
        navigate(`/inbox/sendsAlerts?idGroup=${idGroup}&idProcess=${idProcess}&edition=true`)
      }, 500)
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? MagicString.GENERAL.ERROR_MESSAGE)
    },
  })

  const idActivity = processInfo?.data?.[0]?.pendingActivities?.[0]?.id

  return {
    processInfo,
    loadingProcessInfo,
    errorProcessInfo,
    createProcess,
    loadingCreationProcess,
    getOffice,
    editProcess,
    loadingEditingProcess,
    idActivity,
  }
}

export default useRequestProcessAlerts
