import toast from 'react-hot-toast'
import { useMutationDynamicBaseUrl } from '../useDynamicApi'
import { useCallback } from 'react'

export const useOracleExecutes = () => {
  const {
    mutateAsync: executeQuery,
    isPending: isPendingQuery,
    data: dataExecuteQuery,
  } = useMutationDynamicBaseUrl({
    url: `/oracle/executeQuery`,
    baseKey: 'urlOracleApi',
    method: 'post',
    onError: (e) => {
      toast.error(e?.message ?? 'Error al ejecutar la consulta')
    },
  })

  const { mutateAsync: executeProcedure, isPending: isPendingProcedure } =
    useMutationDynamicBaseUrl({
      url: `/oracle/execute-procedure`,
      baseKey: 'urlOracleApi',
      method: 'post',
      onError: (e) => {
        toast.error(e?.message ?? 'Error al ejecutar la consulta')
      },
    })

  const { mutateAsync: executeFunction, isPending: isPendingFunction } = useMutationDynamicBaseUrl({
    url: `/oracle/execute-function`,
    baseKey: 'urlOracleApi',
    method: 'post',
    onError: (e) => {
      toast.error(e?.message ?? 'Error al ejecutar la consulta')
    },
  })

  const getQueryResult = useCallback(
    async (query) => {
      const outputStringQuery = query.replace(/[\n\t\s]+/g, ' ')
      try {
        const response = await executeQuery({ body: { queryStatement: outputStringQuery } })
        if (!response?.success) {
          toast.error(`${response?.data?.error}: ${outputStringQuery}`)
          return response
        }
        return response
      } catch (error) {
        toast.error(error?.message ?? `Error al ejecutar la consulta: ${outputStringQuery}`)
        return error?.response?.data
      }
    },
    [executeQuery]
  )

  const getProcedureResult = useCallback(
    async (body) => {
      const queryStamentString = body?.statement?.replace(/[\n\t\s]+/g, ' ')
      try {
        const response = await executeProcedure({
          body: { ...body, statement: queryStamentString },
        })
        if (!response?.success) {
          toast.error(`${response?.data?.error}: ${queryStamentString}`)
          return response
        }
        return response
      } catch (error) {
        toast.error(error?.message ?? `Error al ejecutar la consulta: ${queryStamentString}`)
        return error?.response?.data
      }
    },
    [executeProcedure]
  )

  const getFunctionResult = useCallback(
    async (body) => {
      try {
        const response = await executeFunction({
          body,
        })
        if (!response?.success) {
          toast.error(`${response?.data?.error}: ${body?.functionName}`)
          return response
        }
        return response
      } catch (error) {
        toast.error(error?.message ?? `Error al ejecutar la consulta: ${body?.functionName}`)
        return error?.response?.data
      }
    },
    [executeFunction]
  )

  return {
    getQueryResult,
    getProcedureResult,
    getFunctionResult,
    isPendingQuery,
    isPendingProcedure,
    isPendingFunction,
    dataExecuteQuery,
  }
}
