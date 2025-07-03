import { useMutationDynamicBaseUrl } from '@/lib/api'
import { useQueryClient } from '@tanstack/react-query'
import { MagicString } from '@/lib/constants'
import toast from 'react-hot-toast'
import { useStoreState } from 'easy-peasy'
import { taskToBeNotified } from '../constants'
import { useNavigate } from 'react-router-dom'

const useProcessRequests = ({
  idProcess,
  setIdProcess,
  setActiveStep,
  getValues,
  idProcessParent,
  isSubProcess,
  refetchProcessInfo,
  idGroup,
  idProcessType,
}) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const companyData = useStoreState((state) => state.company.companyData)
  const { mutateAsync: getProcessInfo, isPending: loadingProcessInfo } = useMutationDynamicBaseUrl({
    url: `/processes`,
    isCompanyRequest: true,
    baseKey: 'urlProcess',
    method: 'get',
  })

  const { mutateAsync: copyProcessDataToSubProcess, isPending: loadingCopyProcessData } =
    useMutationDynamicBaseUrl({
      url: `/processes`,
      isCompanyRequest: true,
      baseKey: 'urlProcess',
      onSuccess: () => {
        toast.success('Datos hereadados correctamente')
        setActiveStep((prev) => prev + 1)
        navigate(
          `/inbox/familyServices?idGroup=${idGroup}&idProcessParent=${idProcessParent}&idProcessType=${idProcessType}&isSubProcess=true`
        )
        refetchProcessInfo()
      },
      onError: (e) => {
        toast.error(e?.response?.data?.error ?? MagicString.GENERAL.ERROR_MESSAGE)
      },
    })

  const { mutateAsync: notificationProcess, isPending: loadingNotification } =
    useMutationDynamicBaseUrl({
      url: `/processes/${idProcess}/activities/direct-notification`,
      isCompanyRequest: true,
      baseKey: 'urlProcess',
      onSuccess: () => {
        toast.success(MagicString.GENERAL.SUCCESS_MESSAGE)
        queryClient.invalidateQueries([`/${companyData?.companyId}/inbox`])
        setActiveStep((prev) => prev + 1)
      },
      onError: (e) => {
        toast.error(e?.response?.data?.error ?? MagicString.GENERAL.ERROR_MESSAGE)
      },
    })

  const { mutateAsync: createProcess, isPending: loadingCreation } = useMutationDynamicBaseUrl({
    url: `/processes/mode/unnotify`,
    isCompanyRequest: true,
    baseKey: 'urlProcess',
    onSuccess: async (response) => {
      toast.success(MagicString.GENERAL.SUCCESS_MESSAGE)
      const idProcess = response?.data?.id
      setIdProcess(idProcess)
      if (isSubProcess) {
        await copyProcessDataToSubProcess({
          qry: `/${response?.data?.id}/copy-data-from/${idProcessParent}`,
          body: {
            dataToCopy: 'actors',
          },
        })
      } else {
        setActiveStep((prev) => prev + 1)
        navigate(`/inbox/familyServices?idGroup=${idGroup}&idProcess=${idProcess}&edition=true`)
        refetchProcessInfo()
      }
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? MagicString.GENERAL.ERROR_MESSAGE)
    },
  })

  const { mutateAsync: editProcess, isPending: loadintEdit } = useMutationDynamicBaseUrl({
    url: `/processes/${idProcess}`,
    isCompanyRequest: true,
    baseKey: 'urlProcess',
    method: 'put',
    onSuccess: async (response) => {
      toast.success(MagicString.GENERAL.SUCCESS_MESSAGE)
      const requestType = getValues('processData.additionalData.requestType')
      refetchProcessInfo()

      if (requestType === 'consultancy' || requestType === 'workshop') {
        setActiveStep((prev) => prev + 1)
        return
      }

      const responseProcessInfo = await getProcessInfo({
        qry: `/${response?.data?.id}?inclPendingActs=true`,
      })

      const idActivity = responseProcessInfo?.data?.[0]?.pendingActivities?.[0]?.id

      unnotifyProcess({
        body: { status: 'COMPLETED' },
        qry: `/${idActivity}/mode/unnotify`,
      })

      const idUser = response?.data?.processData?.additionalData?.assignLawyer?.id

      notificationProcess({
        body: {
          idAssignedUser: idUser,
          taskName: taskToBeNotified?.[requestType] ?? '',
        },
      })
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? MagicString.GENERAL.ERROR_MESSAGE)
    },
  })

  const { mutateAsync: unnotifyProcess, isPending: loadingUnnotify } = useMutationDynamicBaseUrl({
    url: `/processes/${idProcess}/activities`,
    method: 'put',
    isCompanyRequest: true,
    baseKey: 'urlProcess',
    onSuccess: () => {
      toast.success(MagicString.GENERAL.SUCCESS_MESSAGE)
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? MagicString.GENERAL.ERROR_MESSAGE)
    },
  })

  return {
    createProcess,
    editProcess,
    unnotifyProcess,
    loadingRequests:
      loadingCreation ||
      loadintEdit ||
      loadingNotification ||
      loadingUnnotify ||
      loadingCopyProcessData ||
      loadingProcessInfo,
  }
}

export default useProcessRequests
