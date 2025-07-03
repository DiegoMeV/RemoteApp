import { useNavigate } from 'react-router-dom'
import { DetailSection } from './Detail'
import { MasterSection } from './Master'
import { useOracleExecutes, useQueryOracle, useSubmitRuntime } from '@/libV4'
import toast from 'react-hot-toast'
import {
  onNewRecord,
  preInsert,
  validateInputs,
  whenNewFormInstance,
  whenValidate,
} from './Master/funcs'
import { filterData, typeHandlers } from '../funcs'
import { useMasterInputs } from './Master/hooks'
import { useEffect } from 'react'
import { keyName } from '../constants'
import { tipoValidation } from './Master/constants'
import { QUERY_DETALLE_ORDEN } from './Detail/components/DetalleOrden/funcs'
const MasterForm = ({
  form,
  nit_compania,
  queryParamsPks,
  queryParams,
  getFormValue,
  setFormValue,
  globalVariables,
  ordenPagoData,
  loadingOrdenPagoData,
  refetchOrdenPago,
  handleChangeTab,
  getFechaBLQ,
  setNewGlobalVariables,
  bloquearBloques,
  setBloquearBloques,
  detailTabs,
  valueTab,
  commonPostInsert,
  commonPostUpdate,
  isPendingBD,
}) => {
  const navigate = useNavigate()

  const { getQueryResult, getProcedureResult, isPendingQuery, isPendingProcedure } =
    useOracleExecutes()

  const { data: detalleOrdenData = {} } = useQueryOracle({
    query: QUERY_DETALLE_ORDEN({ nit_compania, queryParamsPks }),
    enabled: !!queryParamsPks?.orden,
    queryKey: ['detalleOrdenPago', queryParamsPks?.orden],
  })

  const { mutateAsync: submitRuntime, isPending: loadingSubmit } = useSubmitRuntime({
    qry: `/keyname/${keyName}`,
    onSuccess: async (response) => {
      toast.success('Guardado exitosamente')

      if (!queryParamsPks?.orden) {
        const data = response?.data?.[0]

        await commonPostInsert()

        navigate(
          `/applications/staticForms/paymentOrders/ordenPagoDirecta/form?orden.pk=${data?.orden}`
        )
        return
      }

      await commonPostUpdate()

      refetchOrdenPago()
    },
    onError: (error) => {
      toast.error(error?.message ?? 'Error al guardar')
    },
  })

  const onSubmit = async () => {
    const validationData = form.getValues('orden_pago')

    const tipo = ordenPagoData?.data?.[0]?.tipo ?? validationData?.tipo

    if (!tipo || !tipoValidation?.includes(tipo)) {
      toast.error('El tipo de orden no es valido')
      return
    }

    if (!queryParamsPks?.orden) {
      const validation = await Promise.all(validateInputs.map((input) => form.trigger(input)))

      const someValidation = validation.some((item) => item === false)

      if (someValidation) {
        return
      }

      await preInsert({
        nit_compania,
        getQueryResult,
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
        getProcedureResult,
      })

      if (
        responseWhenValidate?.data?.outBinds?.OutStatus === 'ERROR' ||
        !responseWhenValidate?.success
      ) {
        toast.error(`${responseWhenValidate?.data?.outBinds?.OutMessage}`)
        return
      }
    }

    const successTrigger = await form?.trigger('orden_pago')

    const allData = form.getValues('orden_pago')

    const dataFiltered = filterData(masterInputs, allData)

    if (successTrigger && queryParamsPks?.orden) {
      submitRuntime({
        body: {
          orden_pago: {
            where: { nit_compania, ...queryParamsPks },
            data: {
              tercero_sol: allData?.tercero_sol,
              tercero_type_sol: allData?.tercero_type_sol,
              tercero_ordenador: allData?.tercero_ordenador,
              tercero_type_ordenador: allData?.tercero_type_ordenador,
              rechazada: allData?.rechazada,
              descripcion_rechazo: allData?.descripcion_rechazo,
              ...dataFiltered,
            },
          },
        },
        bodyMethod: 'put',
      })
      return
    } else if (successTrigger) {
      const convertDate = typeHandlers['date']

      submitRuntime({
        body: {
          blockId: 'orden_pago',
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
            tipo: allData?.tipo,
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
    dataBaseData: ordenPagoData?.data?.[0],
    getProcedureResult,
    onSubmit,
    getQueryResult,
    handleChangeTab,
    getFechaBLQ,
  })

  const getData = async (ordenPagoData) => {
    const data = ordenPagoData?.data?.[0]

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

    const unsoloconsulta = queryParams?.unsoloconsulta ?? 'NO'

    if (unsoloconsulta === 'NO' && data?.estado !== 'V') {
      if (data?.estado !== 'V' && !globalVariables?.usuario.includes('SIIF')) {
        setBloquearBloques(true)
        setNewGlobalVariables({ bloquear_imp: 'S' })
        toast.error('Orden bloqueada para modificaciones, el estado es diferente a Vigente')
      } else {
        setBloquearBloques(false)
        setNewGlobalVariables({ bloquear_imp: 'N' })
      }
    }
  }

  useEffect(() => {
    whenNewFormInstance({
      globalVariables,
      setNewGlobalVariables,
      queryParams,
      setBloquearBloques,
    })
    if (queryParamsPks?.orden && ordenPagoData) {
      getData(ordenPagoData)
      return
    }
    onNewRecord({
      globalVariables,
      setFormValue,
      getQueryResult,
      queryParams,
    })
  }, [nit_compania, queryParamsPks?.orden, ordenPagoData])

  return (
    <>
      <MasterSection
        form={form}
        globalVariables={globalVariables}
        masterInputs={masterInputs}
        ordenPagoData={ordenPagoData}
        loadingOrdenPagoData={loadingOrdenPagoData}
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
        ordenPagoData={ordenPagoData}
        loadingSubmitMaster={loadingSubmit}
        onSubmitMaster={onSubmit}
        setFormValue={setFormValue}
        isPendingBD={isPendingBD}
        detalleOrdenValorNeto={detalleOrdenData?.data?.[0]?.valor_neto ?? 0}
      />
    </>
  )
}

export default MasterForm
