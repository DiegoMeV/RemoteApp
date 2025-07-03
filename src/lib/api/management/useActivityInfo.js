import { baseUrls, useApiRequest } from '@/lib'
import { useQuery } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'

const useActivityInfo = ({ idProcess, idActivity, idCompany }) => {
  const request = useApiRequest()
  const base = baseUrls.urlProcess
  const companyData = useStoreState((state) => state.company.companyData)
  const Company = idCompany ?? companyData?.companyId
  const qry = `/${Company}/processes/${idProcess}/activities/${idActivity}?inclEntitesData=true&inclReturningAct=true`
  return useQuery({
    enabled: !!idActivity,
    queryKey: [qry],
    queryFn: async ({ signal }) => {
      try {
        const response = await request(base, qry, 'get', null, {
          signal,
        })
        return response
      } catch (error) {
        throw error
      }
    },
  })
}

export default useActivityInfo
