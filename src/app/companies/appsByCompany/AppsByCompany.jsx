import { useParams } from 'react-router-dom'
import { ViewAppsByCompany } from './View'
import { useQueryDynamicApi } from '@/libV4'

const AppsByCompany = () => {
  const { idCompany } = useParams()

  const {
    data: appsByCompany,
    isLoading: loadingAppsByCompany,
    isError: errorAppsByCompany,
    refetch: refetchAppsByCompany,
  } = useQueryDynamicApi({
    isCompanyRequest: false,
    baseKey: 'urlUsers',
    url: `/apps?idCompany=${idCompany}`,
  })

  return (
    <ViewAppsByCompany
      idCompany={idCompany}
      appsByCompany={appsByCompany}
      loadingAppsByCompany={loadingAppsByCompany}
      errorAppsByCompany={errorAppsByCompany}
      refetchAppsByCompany={refetchAppsByCompany}
    />
  )
}

export default AppsByCompany
