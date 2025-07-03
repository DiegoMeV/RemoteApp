import { useAllProcessTypeByGroup, useProcessTypeByGroup, useQueryDynamicApi } from '@/lib/api'

const useProcessInfoFamilyServices = ({ idGroup, idProcess }) => {
  const {
    data: processTypes,
    isLoading: loadingProcessTypes,
    isError: errorProcessTypes,
  } = useAllProcessTypeByGroup({ idGroup, allProcessTypes: false, enabled: !!idGroup })

  const {
    data: processGroupsData,
    isLoading: loadingGroupInfo,
    isError: errorGroupInfo,
  } = useProcessTypeByGroup({ qry: `${idGroup}`, enabled: !!idGroup })

  const {
    data: processInfo,
    isFetching,
    isError,
    refetch: refetchProcessInfo,
  } = useQueryDynamicApi({
    url: `/processes/${idProcess}?inclPendingActs=true`,
    baseKey: 'urlProcess',
    isCompanyRequest: true,
    enabled: !!idProcess && idProcess !== 'null',
  })

  return {
    processInfo,
    refetchProcessInfo,
    processTypes,
    processGroupsData,
    loadingInfo: loadingGroupInfo || loadingProcessTypes || isFetching,
    errorInfo: errorProcessTypes || errorGroupInfo || isError,
  }
}

export default useProcessInfoFamilyServices
