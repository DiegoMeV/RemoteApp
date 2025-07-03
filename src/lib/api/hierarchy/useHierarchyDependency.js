import { useMutation } from '@tanstack/react-query'
import { baseUrls, useApiRequest } from '@/lib'
import { useStoreState } from 'easy-peasy'

const useHierarchyDependency = (queryParams) => {
  const base = baseUrls.urlUsers
  const request = useApiRequest()
  const companyData = useStoreState((state) => state.company.companyData)
  const qry = `/${companyData?.companyId}/hierarchy`
  return useMutation({
    mutationFn: async (body) => {
      const { idHierarchy, method, ...sendBody } = body
      const qryComplete = `${qry}/${idHierarchy}`
      const response = await request(base, qryComplete, method, sendBody, null)

      return response
    },
    onSuccess: queryParams.onSuccess,
    onError: queryParams.onError,
  })
}

export default useHierarchyDependency
