import { useMutationDynamicBaseUrl } from '@/lib'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useEffect, useRef } from 'react'

const useInspectionPlan = ({ form, setActiveStep, setQueueInfo, idInspectionPlan }) => {
  const expectedPath = 'audit/expedient/endogens/create'
  const expectedQuery = 'idInspectionPlan='
  const navigate = useNavigate()
  const timeoutRef = useRef(null)

  const { mutateAsync: getInspectionPlanInfo, isPending: isLoadingInfoIP } =
    useMutationDynamicBaseUrl({
      baseKey: 'urlFiscalizacion',
      url: '/inspectionPlan',
      isCompanyRequest: true,
      method: 'GET',
      onSuccess: (e) => {
        if (e?.data?.length > 0) {
          const formData = e.data[0]
          Object.keys(formData).forEach((key) => {
            form.setValue(key, formData[key])
          })
        }
      },
      onError: (e) => {
        toast.error(
          e?.response?.data?.error || 'Error al obtener información del plan de inspección'
        )
      },
    })

  const { mutateAsync: getInspectionPlanQueue } = useMutationDynamicBaseUrl({
    baseKey: 'urlFiscalizacion',
    url: '/queue-logs',
    isCompanyRequest: true,
    method: 'GET',
    onSuccess: (e) => {
      setQueueInfo(e?.data)
      if (e?.data?.[0]?.status === 'COMPLETED') {
        getInspectionPlanInfo({ qry: `/${idInspectionPlan}` })
      }
      if (e?.data?.[0]?.status === 'ERROR') {
        toast.error(e?.data?.[0]?.queueData?.errorMsg || 'Ocurrió un error en la cola')
      }
      if (e?.data?.[0]?.status === 'QUEUED' || e?.data?.[0]?.status === 'INPROGRESS') {
        const path = window.location.pathname
        const search = window.location.search
        if (path.includes(expectedPath) && search.includes(expectedQuery)) {
          timeoutRef.current = setTimeout(() => {
            getInspectionPlanQueue({ qry: `/${e?.data?.[0]?.queueType}/${idInspectionPlan}` })
          }, 5000)
        }
      }
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error || 'Error al obtener información del plan de inspección')
    },
  })
  const { mutateAsync: getInspectionPlanJob } = useMutationDynamicBaseUrl({
    baseKey: 'urlFiscalizacion',
    url: `/inspectionPlan/${idInspectionPlan}/exec-inspection-plan/job-status`,
    isCompanyRequest: true,
    method: 'GET',
    onSuccess: (e) => {
      setQueueInfo(e?.data)
      if (e?.data?.[0]?.estado === 'COMPLETED') {
        getInspectionPlanInfo({ qry: `/${idInspectionPlan}` })
      }
      if (e?.data?.[0]?.estado === 'IN_PROGRESS') {
        const path = window.location.pathname
        const search = window.location.search
        if (path.includes(expectedPath) && search.includes(expectedQuery)) {
          timeoutRef.current = setTimeout(() => {
            getInspectionPlanJob()
          }, 5000)
        }
      }
      if (e?.data?.[0]?.estado === 'FAILED') {
        toast.error('Error al completar JOB en plan de inspección.')
      }
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error || 'Error al obtener información del plan de inspección')
    },
  })

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const { mutateAsync: createInspectionPlan, isPending: isLoadingCreateIP } =
    useMutationDynamicBaseUrl({
      baseKey: 'urlFiscalizacion',
      url: '/inspectionPlan/',
      isCompanyRequest: true,
      method: 'POST',
      onSuccess: (e) => {
        navigate(`/audit/expedient/endogens/create?idInspectionPlan=${e.data.id}`)
        setTimeout(() => {
          setActiveStep(1)
        }, 500)
      },
      onError: (e) => {
        toast.error(e?.response?.data?.error || 'Error al crear el plan de inspección')
      },
    })

  const { mutateAsync: editInspectionPlan, isPending: isLoadingEditIP } = useMutationDynamicBaseUrl(
    {
      baseKey: 'urlFiscalizacion',
      url: '/inspectionPlan',
      isCompanyRequest: true,
      method: 'PUT',
      onSuccess: () => {
        setActiveStep(1)
      },
      onError: (e) => {
        toast.error(e?.response?.data?.error || 'Error al editar el plan de inspección')
      },
    }
  )

  const loadingApis = isLoadingInfoIP || isLoadingCreateIP || isLoadingEditIP

  return {
    getInspectionPlanInfo,
    createInspectionPlan,
    editInspectionPlan,
    getInspectionPlanQueue,
    getInspectionPlanJob,
    loadingApis,
  }
}

export default useInspectionPlan
