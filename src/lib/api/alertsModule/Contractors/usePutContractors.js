import { useMutation } from '@tanstack/react-query'
import { baseUrls, useApiRequest } from '@/lib'
import { useStoreState } from 'easy-peasy'

const usePutContractors = (props) => {
  const request = useApiRequest()
  const companyData = useStoreState((state) => state.company.companyData)
  const idCompany = companyData?.companyId
  return useMutation({
    mutationFn: async (body) => {
      const base = baseUrls.urlCgr
      const qry = `/${idCompany}/terceros/${props?.idContractor}`
      try {
        const response = await request(base, qry, 'put', body, null)
        return response
      } catch (error) {
        throw error
      }
    },
    onSuccess: props.onSuccess,
    onError: props.ponError,
  })
}

export default usePutContractors
