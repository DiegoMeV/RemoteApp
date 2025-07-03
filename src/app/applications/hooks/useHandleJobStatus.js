import { isEmpty, useMutationDynamicBaseUrl } from '@/libV4'
import { useStoreActions } from 'easy-peasy'
import { useRef } from 'react'
import { buildJobStatusUrl } from '../funcs'
import toast from 'react-hot-toast'

export const useHandleJobStatus = (job, jobStatusData) => {
  const updatejobStatusData = useStoreActions(
    (actions) => actions.jobStatusModel.updatejobStatusData
  )
  const timeoutRef = useRef(null)

  const { mutateAsync: getJobStatus } = useMutationDynamicBaseUrl({
    baseKey: 'urlNomina',
    isCompanyRequest: true,
    method: 'GET',
    onSuccess: (e) => {
      const infoAdic = e?.data?.[0]?.infoAdic
      const jobBody = {
        idJob: e?.data?.[0]?.idJob,
        status: e?.data?.[0]?.estado,
        identifier: jobStatusData?.[job]?.identifier,
        queryJobStatus: jobStatusData?.[job]?.queryJobStatus,
      }
      if (e?.data?.[0]?.estado === 'EJECUTANDO') {
        updatejobStatusData({
          [job]: {
            ...jobBody,
            isExecuting: true,
          },
        })
        const path = window.location.pathname
        if (path.includes('applications')) {
          timeoutRef.current = setTimeout(() => {
            const qry = buildJobStatusUrl(
              jobStatusData?.[job]?.queryJobStatus,
              jobStatusData?.[job]?.identifier
            )
            getJobStatus({
              qry,
            })
          }, 5000)
        }
      } else if (e?.data?.[0]?.estado === 'Success') {
        updatejobStatusData({ [job]: { ...jobBody, isExecuting: false } })
        toast.success(
          `La ejecución ${jobStatusData?.[job]?.queryJobStatus} con identificador ${jobStatusData?.[job]?.identifier} se ha completado con éxito`
        )
        if (!isEmpty(infoAdic)) {
          toast.success(infoAdic)
        }
      } else {
        updatejobStatusData({ [job]: { ...jobBody, isExecuting: false } })
        toast.error(
          `Error al ejecutar ${jobStatusData?.[job]?.queryJobStatus} con identificador ${jobStatusData?.[job]?.identifier} se ha completado con éxito`
        )
        if (!isEmpty(infoAdic)) {
          toast.error(infoAdic)
        }
      }
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error || `Error al ejecutar job`)
    },
  })

  return {
    getJobStatus,
  }
}
