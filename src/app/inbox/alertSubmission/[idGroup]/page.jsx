import {
  ErrorPage,
  Loading,
  toArray,
  useGetAllParams,
  useProcessTypeGroupsRequirements,
  useQueryDynamicApi,
} from '@/lib'
import { ViewAlertSubmission } from './views'
import { useEffect, useState } from 'react'
import { handleSetCurrentGroup } from './hooks'
import { useParams } from 'react-router-dom'

const AlertSubmission = () => {
  const params = useParams()
  const idGroup = params?.idGroup
  const othersParams = useGetAllParams()
  const idProcess = othersParams?.idProcess
  const isEdition = Boolean(othersParams?.isEdition)
  const { data: applications, isLoading, isError } = useProcessTypeGroupsRequirements()
  const [currentGroup, setCurrentGroup] = useState({})
  const { data: processInfo, isLoading: loadingProcessInfo } = useQueryDynamicApi({
    isCompanyRequest: true,
    baseKey: 'urlProcess',
    url: `processes/${idProcess}?inclPendingActs=true`,
    enabled: !!idProcess,
  })
  useEffect(() => {
    const apps = toArray(applications?.data)
    if (idGroup && apps.length > 0) {
      handleSetCurrentGroup(applications, idGroup, setCurrentGroup)
    }
  }, [applications, idGroup])

  return isLoading ? (
    <Loading />
  ) : isError ? (
    <ErrorPage />
  ) : (
    <ViewAlertSubmission
      currentGroup={currentGroup}
      idGroup={idGroup}
      idProcess={idProcess}
      processInfo={processInfo}
      loadingProcessInfo={loadingProcessInfo}
      isEdition={isEdition}
    />
  )
}

export default AlertSubmission
