import { useActivityInfo, useGetProcess } from '@/lib'

const useManagement = (params) => {
  const [idProcess, idActivity] = params?.ids || []
  const {
    data: processInfo,
    isLoading: loadingProcessInfo,
    isFetching: fetchingProcessInfo,
    isError: errorProcessInfo,
    refetch: refetchProcessInfo,
  } = useGetProcess({ qry: `/${idProcess}?inclOfficeData=true` })
  const {
    data: activityInfo,
    isLoading: loadindActivityInfo,
    isFetching: fetchingActivityInfo,
    isError: isErrorActivity,
    refetch: refetchActivityInfo,
  } = useActivityInfo({
    idProcess: idProcess,
    idActivity: idActivity,
  })
  return {
    refetchManagement: () => {
      refetchProcessInfo(), refetchActivityInfo()
    },
    processInfo: processInfo?.data,
    activityInfo: activityInfo?.data,
    loading: loadingProcessInfo && loadindActivityInfo,
    isError: errorProcessInfo && isErrorActivity,
    isFetching: fetchingProcessInfo || fetchingActivityInfo,
  }
}

export default useManagement
