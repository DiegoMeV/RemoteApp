import { useQueries } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { toArray } from '../utils'
import { useGetAnalyticsSet } from '../api'

const genericReq = [
  { reqType: 'processes-by-status' },
  { reqType: 'processes-by-assigned-user' },
  { reqType: 'processes-by-type', reqRes: true },
  { reqType: 'processes-by-year', reqRes: true },
]

const useReqCharts = ({
  baseKey = '',
  queryParams = '',
  setInfoCharts = () => {},
  requests = [],
} = {}) => {
  const handleError = (e) => toast.error(e?.response?.data?.error ?? 'Error al filtrar los datos')

  let reqArr = toArray(requests)
  if (reqArr.length === 0) {
    reqArr = genericReq
  }

  const { mutateAsync } = useGetAnalyticsSet({
    baseKey,
    isCompanyRequest: true,
    setValue: setInfoCharts,
    queryParam: `wholeCompany=true`,
    onError: handleError,
  })

  const results = useQueries({
    queries: reqArr.map(({ reqType = '', reqRes = false }) => ({
      queryKey: ['analytics', reqType, queryParams],
      queryFn: () =>
        mutateAsync({
          type: reqType,
          additionalParam: queryParams,
          isResponseObject: reqRes,
        }),
    })),
  })

  return {
    loadingStates: results.map(({ isLoading }) => isLoading),
  }
}

export default useReqCharts
