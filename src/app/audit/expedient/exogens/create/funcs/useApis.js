import { useMutationDynamicBaseUrl } from '@/lib'
import { useRef } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export const useApis = ({ form, setActiveStep, setQueueInfo, idInspectionPlan }) => {
  const expectedPath = 'audit/expedient/exogens/create'
  const expectedQuery = 'idInspectionPlan='
  const timeoutRef = useRef(null)
  const navigate = useNavigate()
  const { mutateAsync: getInspectionPlanInfo, isPending: isLoadingInfoIP } =
    useMutationDynamicBaseUrl({
      baseKey: 'urlFiscalizacion',
      url: '/inspectionPlan',
      isCompanyRequest: true,
      method: 'GET',
      onSuccess: (e) => {
        if (e?.data?.length > 0) {
          const formData = e.data[0]
          // Iterar sobre las propiedades del objeto y setear los valores en el formulario
          Object.keys(formData).forEach((key) => {
            form.setValue(key, formData[key])
          })
        }
      },
      onError: (e) => {
        toast.error(
          e?.response?.data?.error || 'Error al obtener información el plan de inspección'
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
  const { mutateAsync: createInspectionPlan, isPending: isLoadingCreateIP } =
    useMutationDynamicBaseUrl({
      baseKey: 'urlFiscalizacion',
      url: '/inspectionPlan/',
      isCompanyRequest: true,
      method: 'POST',
      onSuccess: (e) => {
        navigate(`/audit/expedient/exogens/create?idInspectionPlan=${e.data.id}`)
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
        toast.error(e?.response?.data?.error || 'Error al crear el plan de inspección')
      },
    }
  )
  const loadingApis = isLoadingInfoIP || isLoadingCreateIP || isLoadingEditIP
  return {
    getInspectionPlanInfo,
    createInspectionPlan,
    editInspectionPlan,
    getInspectionPlanQueue,
    loadingApis,
  }
}
