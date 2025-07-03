import { Box } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useGetAllParams, useGlobalVaribles } from '@/lib'
import { useMemo, useState } from 'react'
import { isEmpty, LoadingError, useOracleExecutes, useQueryOracle } from '@/libV4'
import { FORM_GLOBAL_VARIABLES } from './funcs'
import { ViewPaymentOrder } from './views'
import { QUERY_ORDEN_PAGOU } from './components/Master/funcs'
import { useStoreState } from 'easy-peasy'
import { QUERY_DEP_RET_FUENTE } from './components/Detail/components/DepuracionRetFuente/funcs'
import { useCommonFuncs } from './hooks'

const OrdenPagoUnica = () => {
  const getGlobalVariables = useGlobalVaribles()
  const userParameters = useStoreState((state) => state.userParameter.userParameter)

  const { nit_compania, ...globalVariables } = getGlobalVariables({})
  const [newGlobals, setNewGlobals] = useState({
    nrodoc_fraeq: 'N',
  })

  const form = useForm({
    mode: 'onBlur',
  })

  const setNewGlobalVariables = (newGlobals) => {
    setNewGlobals((prev) => ({
      ...prev,
      ...newGlobals,
    }))
  }

  const queryParams = useGetAllParams()

  const orderedQueryParams = useMemo(() => {
    return Object.entries(queryParams).reduce(
      (acc, [key, value]) => {
        if (key.includes('.pk')) {
          const newKey = key.replace('.pk', '')
          acc.pks[newKey] = value
        } else {
          acc.nonPks[key] = value
        }
        return acc
      },
      { pks: {}, nonPks: {} } // Inicializamos con dos objetos vacíos
    )
  }, [queryParams])

  const { data: formGlobalVariables, isFetching: loadingFormGV } = useQueryOracle({
    query: FORM_GLOBAL_VARIABLES({ nit_compania }),
    enabled: !!nit_compania,
    queryKey: ['globalVariables', nit_compania],
  })

  const {
    data: ordenPagouData,
    isLoading: fisrtLoadingOrdenPagouData,
    isFetching: loadingOrdenPagouData,
    refetch: refetchOrdenPagou,
    isError: errorLoadingOrdenPagouData,
  } = useQueryOracle({
    query: QUERY_ORDEN_PAGOU({
      nit_compania,
      queryParamsPks: orderedQueryParams?.pks,
      queryParams: orderedQueryParams?.nonPks,
    }),
    enabled: !!orderedQueryParams?.pks?.orden,
    queryKey: ['orden_pagou', nit_compania, orderedQueryParams?.pks?.orden],
  })

  const { data: depRetFuenteData } = useQueryOracle({
    query: QUERY_DEP_RET_FUENTE({ nit_compania, queryParamsPks: orderedQueryParams?.pks }),
    enabled: !!orderedQueryParams?.pks?.orden,
    queryKey: ['depRetFuenteData', nit_compania, orderedQueryParams?.pks?.orden],
  })

  const getFormValue = (keyData) => {
    const value = form.watch(keyData)
    return value
  }

  const setFormValue = (keyData, value) => {
    form.setValue(keyData, value)
  }

  const newGlobalVariables = {
    ...globalVariables,
    ...formGlobalVariables?.data?.[0],
    division2: Object?.keys?.(userParameters)?.length > 0 ? '%' : globalVariables?.division,
    ...newGlobals,
  }

  const { getQueryResult, isPendingQuery, getProcedureResult, isPendingProcedure } =
    useOracleExecutes()

  const getFechaBLQ = async () => {
    const fecha = ordenPagouData?.data?.[0]?.fecha

    if (!isEmpty(fecha)) {
      const query = `	SELECT FECHA_BLQ_ORD  
                    FROM ano 
                    WHERE 	NIT_COMPANIA = ${nit_compania} AND 
                      ANO = '${new Date(ordenPagouData?.data?.[0]?.fecha).getFullYear()}'`
      const response = await getQueryResult(query)
      return response?.data?.[0]?.fecha_blq_ord || ''
    }
  }

  const { commonPostInsert, commonPostUpdate } = useCommonFuncs({
    nit_compania,
    getFormValue,
    depRetFuenteData,
    getProcedureResult,
  })

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'backgroundGrey1',
      }}
    >
      <LoadingError
        loading={loadingFormGV || fisrtLoadingOrdenPagouData}
        error={errorLoadingOrdenPagouData}
      >
        <ViewPaymentOrder
          form={form}
          nit_compania={nit_compania}
          newGlobalVariables={newGlobalVariables}
          queryParams={orderedQueryParams?.nonPks}
          queryParamsPks={orderedQueryParams?.pks}
          getFormValue={getFormValue}
          setFormValue={setFormValue}
          ordenPagouData={ordenPagouData}
          loadingOrdenPagouData={loadingOrdenPagouData}
          refetchOrdenPagou={refetchOrdenPagou}
          getFechaBLQ={getFechaBLQ}
          setNewGlobalVariables={setNewGlobalVariables}
          commonPostInsert={commonPostInsert}
          commonPostUpdate={commonPostUpdate}
          isPendingBD={isPendingQuery || isPendingProcedure}
        />
      </LoadingError>
    </Box>
  )
}

export default OrdenPagoUnica
