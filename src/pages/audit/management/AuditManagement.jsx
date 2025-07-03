import { ViewManagement } from './views'
import { useQueryDynamicApi } from '@/libV4'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const AuditManagement = ({ idProcessModal, idActivityModal, onSuccFinMan }) => {
  const { idProcess } = useParams()
  const [activityToCreate, setActivityToCreate] = useState([])
  const [actualActivity, setActualActivity] = useState()

  useEffect(() => {
    if (idActivityModal) {
      setActualActivity(idActivityModal)
    }
  }, [idProcessModal, idActivityModal])

  const {
    data: processInfo,
    isFetching: fetchingProcessInfo,
    isError: errorProcessInfo,
    refetch: refetchProcessInfo,
  } = useQueryDynamicApi({
    baseKey: 'urlFiscalizacion',
    url: `/processes/${idProcessModal ?? idProcess}?inclOfficeData=true`,
  })

  const { data: activityInfo, isFetching: loadingActivities } = useQueryDynamicApi({
    baseKey: 'urlFiscalizacion',
    url: `/processes/${idProcessModal ?? idProcess}/activities/${actualActivity}`,
    enabled: !!actualActivity,
  })

  return (
    // <AccessControl
    //   privilege='procesos.proceso.visualizar_datos_basicos'
    //   nodeContent={<NoAccessCard />}
    // >
    <ViewManagement
      ids={[idProcessModal ?? idProcess, actualActivity]}
      dataManagement={{
        activityInfo: activityInfo?.data ?? [],
        loadingActivities,
        processInfo: processInfo?.data,
        isFetching: fetchingProcessInfo,
        isError: errorProcessInfo,
        refetchManagement: refetchProcessInfo,
      }}
      activityToCreate={activityToCreate}
      actualActivity={actualActivity}
      setActivityToCreate={setActivityToCreate}
      setActualActivity={setActualActivity}
      onSuccFinMan={onSuccFinMan}
    />
    // </AccessControl>
  )
}

export default AuditManagement
