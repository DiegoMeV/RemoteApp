import { useNavigate } from 'react-router-dom'
import { DetailSection } from './Detail'
import { MasterSection } from './Master'
import { useOracleExecutes, useQueryOracle, useSubmitRuntime } from '@/libV4'
import toast from 'react-hot-toast'
import {
  onNewRecord,
  postInsert,
  postUpdate,
  preInsert,
  preUpdate,
  validateInputs,
  whenNewFormInstance,
  whenValidate,
} from './Master/funcs'
import { filterData, typeHandlers } from '../funcs'
import { useMasterInputs } from './Master/hooks'
import { useEffect } from 'react'
import { keyName } from '../constants'
import { QUERY_DEP_RET_FUENTE } from './Detail/components/DepuracionRetFuente/funcs'

const MasterForm = ({
  form,
  nit_compania,
  queryParamsPks,
  queryParams,
  getFormValue,
  setFormValue,
  globalVariables,
  ordenPagouData,
  loadingOrdenPagouData,
  refetchOrdenPagou,
  handleChangeTab,
  getFechaBLQ,
  setNewGlobalVariables,
  bloquearBloques,
  setBloquearBloques,
  miaplicanum,
  detailTabs,
  valueTab,
  commonPostInsert,
  commonPostUpdate,
  isPendingBD,
}) => {
  const navigate = useNavigate()

  const {
    getQueryResult,
    getProcedureResult,
    getFunctionResult,
    isPendingQuery,
    isPendingProcedure,
  } = useOracleExecutes()

  const { data: depRetFuenteData } = useQueryOracle({
    query: QUERY_DEP_RET_FUENTE({ nit_compania, queryParamsPks }),
    enabled: !!queryParamsPks?.orden,
    queryKey: ['depRetFuenteData', nit_compania, queryParamsPks?.orden],
  })

  const { mutateAsync: submitRuntime, isPending: loadingSubmit } = useSubmitRuntime({
    qry: `/keyname/${keyName}`,
    onSuccess: async (response) => {
      toast.success('Guardado exitosamente')

      if (!queryParamsPks?.orden) {
        const data = response?.data?.[0]

        const responsePostInsert = await postInsert({
          nit_compania,
          data,
          getProcedureResult,
        })

        const responseGeneralPI = await commonPostInsert()

        if (responseGeneralPI?.data?.outBinds?.OutStatus === 'ERROR') {
          toast.error(
            responseGeneralPI?.data?.outBinds?.OutMessage ?? 'Error al realizar general post insert'
          )
        }

        if (responsePostInsert?.data?.outBinds?.OutStatus === 'SUCCESS') {
          navigate(
            `/applications/staticForms/paymentOrders/ordenPagoUnica/form?orden.pk=${data?.orden}`
          )
          return
        }
        toast.error(responsePostInsert?.data?.outBinds?.OutMessage ?? 'Error al guardar')

        return
      }

      const responsePostUpdate = await commonPostUpdate()

      if (responsePostUpdate?.data?.outBinds?.OutStatus === 'ERROR') {
        toast.error(
          responsePostUpdate?.data?.outBinds?.OutMessage ?? 'Error al realizar general post update'
        )
      }

      await postUpdate({
        nit_compania,
        queryParamsPks,
        data: response?.data?.[0],
        getProcedureResult,
      })

      refetchOrdenPagou()
    },
    onError: (error) => {
      toast.error(error?.message ?? 'Error al guardar')
    },
  })

  const onSubmit = async () => {
    const validationData = form.getValues('orden_pagou')

    if (!queryParamsPks?.orden) {
      const validation = await Promise.all(validateInputs.map((input) => form.trigger(input)))

      const someValidation = validation.some((item) => item === false)

      if (someValidation) {
        return
      }

      await preInsert({
        nit_compania,
        queryParamsPks,
        getQueryResult,
        getProcedureResult,
        getFunctionResult,
        setFormValue,
        validationData,
        setNewGlobalVariables,
      })
    } else {
      const responseWhenValidate = await whenValidate({
        nit_compania,
        queryParamsPks,
        validationData,
        queryParams,
        depRetFuenteData,
        getProcedureResult,
      })

      if (
        responseWhenValidate?.data?.outBinds?.OutStatus === 'ERROR' ||
        !responseWhenValidate?.success
      ) {
        toast.error(`${responseWhenValidate?.data?.outBinds?.OutMessage}`)
        return
      }

      const responsePreUpdate = await preUpdate({
        nit_compania,
        getProcedureResult,
        validationData,
      })

      if (responsePreUpdate?.data?.outBinds?.OutStatus === 'ERROR') {
        toast.error(
          responsePreUpdate?.data?.outBinds?.OutMessage ?? 'Error al realizar numerar fraeq'
        )
        return
      }

      const data = responsePreUpdate?.data?.outBinds
      const OutGlobalNroDocFraeq = data?.OutGlobalNroDocFraeq

      setNewGlobalVariables({
        nrodoc_fraeq: OutGlobalNroDocFraeq ?? 'N',
      })

      setFormValue('orden_pagou.consecutivo_num_fe', data?.miconsecutivo ?? null)
    }

    const successTrigger = await form?.trigger('orden_pagou')

    const allData = form.getValues('orden_pagou')

    const dataFiltered = filterData(masterInputs, allData)

    if (successTrigger && queryParamsPks?.orden) {
      submitRuntime({
        body: {
          orden_pagou: { where: { nit_compania, ...queryParamsPks }, data: dataFiltered },
        },
        bodyMethod: 'put',
      })
      return
    } else if (successTrigger) {
      const convertDate = typeHandlers['date']

      submitRuntime({
        body: {
          blockId: 'orden_pagou',
          data: {
            nit_compania,
            orden: Number(allData?.orden),
            tipo_compcnt: Number(allData?.tipo_compcnt),
            fecha_cia: convertDate(new Date()),
            usuario_registro: globalVariables?.usuario,
            clase_pago: allData?.clase_pago,
            subsidiado: queryParams?.unsubsidiado,
            prefijo_num_fe: allData?.prefijo_num_fe,
            aplica_num_fe: allData?.aplica_num_fe,
            ...dataFiltered,
          },
        },
        bodyMethod: 'post',
      })
      return
    }
    toast.error('Error al guardar, por favor intente nuevamente')
  }

  const { masterInputs } = useMasterInputs({
    nit_compania,
    queryParamsPks,
    queryParams,
    getFormValue,
    setFormValue,
    globalVariables,
    dataBaseData: ordenPagouData?.data?.[0],
    getProcedureResult,
    onSubmit,
    getQueryResult,
    handleChangeTab,
    getFechaBLQ,
  })

  const getData = async (ordenPagouData) => {
    const data = ordenPagouData?.data?.[0]

    masterInputs?.forEach?.((input) => {
      const name = input?.name?.split('.')?.[1]
      if (data?.[name] && input?.type === 'switch') {
        form.setValue(input.name, data?.[name] === 'S' ? true : false)
        return
      }
      if (data?.[name]) {
        form.setValue(input.name, data[name])
      }
    })
    setFormValue('orden_pagou.tipo_compcnt', data?.tipo_compcnt)

    if (!queryParamsPks?.orden) {
      const unsoloconsulta = queryParams?.unsoloconsulta ?? 'NO'

      if (unsoloconsulta === 'NO' && data?.estado !== 'V') {
        setBloquearBloques(true)
        setNewGlobalVariables({ bloquear_imp: 'S' })
      }
    }

    const valor = Number(data?.valor) || 0
    const iva = Number(data?.iva) || 0
    const valorTotal = valor + iva

    setFormValue('orden_pagou.total_orden', valorTotal)

    const fecha_blq = await getFechaBLQ()

    let miBloquear = 'S'

    if (data?.estado === 'V') {
      miBloquear = 'N'
    }

    const fecha_orden_pagou = data?.fecha

    if (fecha_orden_pagou < fecha_blq && nit_compania !== 891480085) {
      miBloquear = 'S'
    }

    if (fecha_orden_pagou > fecha_blq && nit_compania === 891480085) {
      miBloquear = 'S'
    }
    if (queryParams?.unsoloconsulta === 'SI') {
      miBloquear = 'S'
    }

    if (miBloquear === 'S') {
      setBloquearBloques(true)
      setNewGlobalVariables({ bloquear_imp: 'S' })
    } else {
      setBloquearBloques(false)
      setNewGlobalVariables({ bloquear_imp: 'N' })
    }
  }

  useEffect(() => {
    whenNewFormInstance({
      globalVariables,
      setNewGlobalVariables,
      queryParams,
      miaplicanum,
      setBloquearBloques,
    })
    if (queryParamsPks?.orden && ordenPagouData) {
      getData(ordenPagouData)
      return
    }
    onNewRecord({
      globalVariables,
      setFormValue,
      getFunctionResult,
      getQueryResult,
      nit_compania,
      setNewGlobalVariables,
    })
  }, [nit_compania, queryParamsPks?.orden, ordenPagouData])

  return (
    <>
      <MasterSection
        form={form}
        globalVariables={globalVariables}
        masterInputs={masterInputs}
        ordenPagouData={ordenPagouData}
        loadingOrdenPagouData={loadingOrdenPagouData}
        bloquearBloques={bloquearBloques}
        loadingBackdrop={isPendingQuery || loadingSubmit || isPendingProcedure || isPendingBD}
        onSubmit={onSubmit}
      />
      <DetailSection
        nit_compania={nit_compania}
        detailTabs={detailTabs}
        queryParamsPks={queryParamsPks}
        queryParams={queryParams}
        globalVariables={globalVariables}
        getFormValue={getFormValue}
        valueTab={valueTab}
        handleChangeTab={handleChangeTab}
        bloquearBloques={bloquearBloques}
        ordenPagouData={ordenPagouData}
        onSubmitMaster={onSubmit}
        setFormValue={setFormValue}
        isPendingBD={isPendingBD}
      />
    </>
  )
}

export default MasterForm
