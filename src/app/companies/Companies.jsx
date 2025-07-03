import { useQueryDynamicApi } from '@/libV4'
import { ViewCompanies } from './View'

const Companies = () => {
  const {
    data: companies,
    isLoading: loadingCompanies,
    isError: errorCompanies,
    refetch: refetchCompanies,
  } = useQueryDynamicApi({
    isCompanyRequest: false,
    baseKey: 'urlUsers',
    url: '/companies',
  })
  return (
    <>
      <ViewCompanies
        companies={companies}
        loadingCompanies={loadingCompanies}
        errorCompanies={errorCompanies}
        refetchCompanies={refetchCompanies}
      />
    </>
  )
}

export default Companies
