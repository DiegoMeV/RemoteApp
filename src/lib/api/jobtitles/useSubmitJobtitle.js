import { useMutation } from '@tanstack/react-query'
import { baseUrls, useApiRequest } from '@/lib'
import { useStoreState } from 'easy-peasy'

const useSubmitJobtitle = ({ qry, method = 'post', ...props }) => {
  const request = useApiRequest()
  const companyData = useStoreState((state) => state.company.companyData)
  return useMutation({
    mutationFn: async ({ bodyQry, body = null }) => {
      const base = baseUrls.urlUsers
      const url = `/${companyData?.companyId}/jobTitles${qry ?? ''}${bodyQry ?? ''}`
      try {
        const response = await request(base, url, method, body, null)
        return response
      } catch (error) {
        throw error
      }
    },
    ...props,
  })
}

export default useSubmitJobtitle
