import toast from 'react-hot-toast'
import { useQueryDynamicApi } from '../useDynamicApi'
import { useEffect } from 'react'

export const useQueryOracle = ({ query, ...rest }) => {
  const outputStringQuery = query?.replace(/[\n\t\s]+/g, ' ')
  const queryRequest = useQueryDynamicApi({
    url: `/oracle/executeQuery`,
    baseKey: 'urlOracleApi',
    method: 'post',
    body: { queryStatement: outputStringQuery },
    staleTime: 1000 * 60 * 30, // 30 minutes'
    ...rest,
  })

  useEffect(() => {
    if (queryRequest?.isError) {
      toast.error(`Error al ejecutar la consulta: ${outputStringQuery}`)
    }
  }, [queryRequest?.isError, queryRequest.error, outputStringQuery])

  return queryRequest
}
