import { useMutationDynamicBaseUrl } from '@/lib'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'

const useApisMassiveActivities = ({ form, setActiveStep, idGuide, setQueueInfo }) => {
  const expectedPath = '/audit/massiveManagement/expedients/create'
  const expectedQuery = 'idGuide='
  const navigate = useNavigate()
  const timeoutRef = useRef(null)

  const { mutateAsync: getMassiveGuidesInfo, isPending: isLoadingInfoMA } =
    useMutationDynamicBaseUrl({
      baseKey: 'urlFiscalizacion',
      url: '/guides-groups',
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
        toast.error(e?.response?.data?.error || 'Error al obtener información actividad')
      },
    })
    const { mutateAsync: getInfoTemplate, isPending: isLoadingTemplate } = useMutationDynamicBaseUrl({
      baseKey: 'urlFiscalizacion',
      url: '/fileType?querySearch=PLANTILLA_GUIAS_MASIV&includeColsSpecs=true',
      isCompanyRequest: true,
      method: 'GET',
      onSuccess: async (e) => {
        if (e?.data?.length > 0) {
          const formData = e.data[0]
          // Iterar sobre las propiedades del objeto y setear los valores en el formulario
          form.setValue('idTemplate', formData.idTemplate)
          form.setValue('FileColsSpecs', formData.FileColsSpecs)
        }
      },
      onError: (e) => {
        toast.error(e?.response?.data?.error || 'Error al obtener información de la plantilla')
      },
    })

  const { mutateAsync: getMassiveActivitiesQueue } = useMutationDynamicBaseUrl({
    baseKey: 'urlFiscalizacion',
    url: '/queue-logs',
    isCompanyRequest: true,
    method: 'GET',
    onSuccess: (e) => {
      setQueueInfo(e?.data)
      if (e?.data?.[0]?.status === 'QUEUED' || e?.data?.[0]?.status === 'INPROGRESS') {
        const path = window.location.pathname
        const search = window.location.search
        if (path.includes(expectedPath) && search.includes(expectedQuery)) {
          timeoutRef.current = setTimeout(() => {
            getMassiveActivitiesQueue({ qry: `/MASSIVE_APPLY_ACTIVITY/${idGuide}` })
          }, 5000)
        }
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

  const { mutateAsync: createMassiveGuide, isPending: isLoadingCreateMA } =
    useMutationDynamicBaseUrl({
      baseKey: 'urlFiscalizacion',
      url: '/guides-groups',
      isCompanyRequest: true,
      method: 'POST',
      onSuccess: (e) => {
        navigate(`/audit/massiveManagement/guides/create?idGuide=${e.data.id}`)
        setTimeout(() => {
          setActiveStep(1)
        }, 500)
      },
      onError: (e) => {
        toast.error(e?.response?.data?.error || 'Error al crear actividad masiva')
      },
    })

  const { mutateAsync: editMassiveGuide, isPending: isLoadingEditMA } = useMutationDynamicBaseUrl({
    baseKey: 'urlFiscalizacion',
    url: '/guides-groups',
    isCompanyRequest: true,
    method: 'PUT',
    onError: (e) => {
      toast.error(e?.response?.data?.error || 'Error al crear actividad masiva')
    },
  })

  const loadingApis = isLoadingInfoMA || isLoadingCreateMA || isLoadingEditMA || isLoadingTemplate

  return {
    getMassiveGuidesInfo,
    createMassiveGuide,
    editMassiveGuide,
    getMassiveActivitiesQueue,
    getInfoTemplate,
    loadingApis,
  }
}

export default useApisMassiveActivities
