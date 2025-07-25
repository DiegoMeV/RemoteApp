import { baseUrls, useApiRequest } from '@/lib'
import { useQuery } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'

const useListVarBlock = ({ idBlock }) => {
  const request = useApiRequest()
  const companyData = useStoreState((state) => state.company.companyData)
  const idCompany = companyData?.companyId
  const base = baseUrls.urlCgr
  const qry = `/${idCompany}/variablesBloque?idBloque=${idBlock}`
  return useQuery({
    queryKey: [qry],
    enabled: idBlock !== 'new',
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

export default useListVarBlock
