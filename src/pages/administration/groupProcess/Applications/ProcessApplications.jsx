import { PageNotFound } from '@/lib'
import { ErrorPage, useGetProcessTypeGroups } from '@/libV4'
import { useStoreState } from 'easy-peasy'
import { ViewProcessApplications } from './views'

const ProcessApplications = () => {
  const userData = useStoreState((state) => state.user.userData)

  const isSuperSayayin = userData?.superSaiyayin

  const {
    data: applications,
    isFetching: loadingApplications,
    isError: errorLoadingApplications,
  } = useGetProcessTypeGroups({ enabled: isSuperSayayin })

  return isSuperSayayin ? (
    errorLoadingApplications ? (
      <ErrorPage />
    ) : (
      <ViewProcessApplications
        applications={applications?.data}
        loadingApplications={loadingApplications}
      />
    )
  ) : (
    <PageNotFound />
  )
}

export default ProcessApplications
