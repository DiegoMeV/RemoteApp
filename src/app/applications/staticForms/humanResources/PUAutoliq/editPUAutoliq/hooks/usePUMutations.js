import { useStoreActions, useStoreState } from 'easy-peasy'
import { useState } from 'react'
import { buildJobStatusUrl } from '../../../funcs'
import toast from 'react-hot-toast'
import { downloadFile, useMutationDynamicBaseUrl } from '@/libV4'
import { extractFileName, useDownloadTxt } from '@/lib'

const usePUMutations = ({ secuence, navigate, handleGetDetail, setInfoDetail }) => {
  const jobStatusData = useStoreState((state) => state.jobStatusModel.jobStatusData)
  const updatejobStatusData = useStoreActions(
    (actions) => actions.jobStatusModel.updatejobStatusData
  )
  const autoliqPU = jobStatusData?.autoliqPU || {}
  const queryJobStatus = 'cargar_autoliquidacion_job'
  const [showJobStatus, setShowJobStatus] = useState(false)

  const { mutateAsync: getJobStatus } = useMutationDynamicBaseUrl({
    baseKey: 'urlNomina',
    isCompanyRequest: true,
    method: 'GET',
    onSuccess: (e) => {
      const jobBody = {
        idJob: e?.data?.[0]?.idJob,
        status: e?.data?.[0]?.estado,
        identifier: secuence,
        queryJobStatus,
        isExecuting: true,
      }
      updatejobStatusData({ autoliqPU: { ...jobBody } })
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error || 'Error al cargar la autoliquidación')
    },
  })

  const handleGetJobStatus = () => {
    setShowJobStatus(true)
    const qry = buildJobStatusUrl(queryJobStatus, secuence)
    getJobStatus({
      qry,
    })
  }

  const { mutateAsync: deletePlanilla, isPending: isDeletingPlanilla } = useMutationDynamicBaseUrl({
    url: `/planilla/planillaUnica`,
    baseKey: 'urlNomina',
    method: 'delete',
    onSuccess: (response) => {
      if (response?.data?.outBinds?.P_OutStatus === 'Success') {
        toast.success(response?.data?.outBinds?.P_Message ?? 'Planilla eliminada correctamente')
        handleGetDetail()
        navigate('/applications/staticForms/humanResources/PUAutoliq')
      } else {
        toast.error(response?.data?.outBinds?.P_Message ?? 'Error al eliminar la planilla')
      }
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? 'Error al eliminar la planilla')
    },
  })

  const { mutateAsync: downloadTxt, isPending: isPendingDownloadTxt } = useDownloadTxt({
    baseUrl: 'urlNomina',
    url: `/planilla/generarPlanoPU`,
    onSuccess: async ({ headers, blob }) => {
      const contentType = headers.get('Content-Type') ?? 'text/plain'
      const fileName = extractFileName(headers)
      await downloadFile(blob, fileName, contentType)
    },
  })

  const { mutateAsync: chargeAutoliq, isPending: isChargingAutoli } = useMutationDynamicBaseUrl({
    url: `/planilla/cargarAutoliquidacion`,
    baseKey: 'urlNomina',
    method: 'post',
    onSuccess: (response) => {
      if (response?.data?.outBinds?.P_OutStatus === 'Success') {
        toast.success(
          `Autoliquidación cargada correctamente,  id tarea: ${
            response?.data?.outBinds?.P_Message ?? ''
          }`
        )
        setInfoDetail([])
        handleGetJobStatus()
      } else {
        toast.error(response?.data?.outBinds?.P_Message ?? 'Error al cargar la autoliquidación')
      }
    },
    onError: (e) => {
      toast.error(e?.error ?? 'Error al cargar la autoliquidación')
    },
  })

  return {
    downloadTxt,
    deletePlanilla,
    chargeAutoliq,
    handleGetJobStatus,
    jobStatusData: autoliqPU,
    showJobStatus,
    setShowJobStatus,
    isLoading: isPendingDownloadTxt || isDeletingPlanilla || isChargingAutoli,
  }
}

export default usePUMutations
