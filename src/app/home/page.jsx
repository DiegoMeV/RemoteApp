import { useQueryDynamicApi } from '@/lib'
import { ViewHome } from './views'

const Home = () => {
  const {
    data: companies,
    isFetching: loadingCompanies,
    isError: errorGettingCompanies,
  } = useQueryDynamicApi({
    isCompanyRequest: false,
    baseKey: 'urlUsers',
    url: '/companies',
  })
  return (
    <ViewHome
      companies={companies}
      loadingCompanies={loadingCompanies}
      errorGettingCompanies={errorGettingCompanies}
    />
  )
}

export default Home
