import { useBoolean } from '@/lib'
import { AddCircle } from '@mui/icons-material'
import { Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import {
  calculateTotal,
  detalleOrdencolumns,
  inputsEditionDetalleOrden,
  postDelete,
  QUERY_DETALLE_ORDEN,
} from './funcs'
import { BasicTable, useOracleExecutes, useQueryOracle } from '@/libV4'
import { keyName } from '../../../../constants'
import { filterData } from '../../../../funcs'
import { EditionModal, SumaryTotal } from './components'
import { useSubmitHooks } from '../../../../hooks'
import { useStoreActions } from 'easy-peasy'
import toast from 'react-hot-toast'

const DetalleOrden = ({
  nit_compania,
  queryParams,
  queryParamsPks,
  getFormValue,
  commonPostInsert,
  commonPostUpdate,
  ordenPagoData,
  detalleOrdenValorNeto,
}) => {
  const editionModal = useBoolean(null, {
    content: '¿Está seguro de cancelar los cambios?',
    icon: 'warning',
  })

  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )

  const [rowSelected, setRowSelected] = useState(null)
  const [detalleOrdenRows, setDetalleOrdenRows] = useState([])
  const { control, setValue, getValues, reset, watch, trigger } = useForm()

  const editOrAddRow = (row) => {
    editionModal?.handleShow()
    setRowSelected(row)
    if (row) {
      inputs.forEach((input) => {
        setValue(input.name, row[input.name])
      })
      return
    }
    reset()
  }

  const {
    getQueryResult: getQueryResultInputs,
    getProcedureResult,
    isPendingQuery: isPendingQueryInputs,
    isPendingProcedure,
  } = useOracleExecutes()

  const {
    data: detalleOrdenData = {},
    isFetching: loadingDOrdenData = false,
    refetch: refetchDetalleOrden,
  } = useQueryOracle({
    query: QUERY_DETALLE_ORDEN({ nit_compania, queryParamsPks }),
    enabled: !!queryParamsPks?.orden,
    queryKey: ['detalleOrdenPago', queryParamsPks?.orden],
  })

  const totals = calculateTotal(detalleOrdenRows)

  const ordenPagoTipoCpto = ordenPagoData?.data?.[0]?.tipo_cpto

  const inputs = inputsEditionDetalleOrden({
    setValue,
    nit_compania,
    queryParamsPks,
    getFormValue,
    getQueryResultInputs,
    watch,
    getValues,
    getProcedureResult,
    rowSelected,
    totals,
    ordenPagoData,
  })

  useEffect(() => {
    if (detalleOrdenData?.data) {
      const newRows = detalleOrdenData?.data?.map((row) => ({
        id: crypto.randomUUID(),
        ...row,
      }))
      setDetalleOrdenRows(newRows)
    }
  }, [detalleOrdenData])

  const { submitRuntime, deleteRecord, loadingSubmit, deletingRecord } = useSubmitHooks({
    keyName,
    getData: async ({ isDeleted } = {}) => {
      if (!isDeleted) {
        if (rowSelected) {
          await commonPostUpdate()
        } else {
          await commonPostInsert()
        }
      } else {
        const responsePostDelete = await postDelete({
          nit_compania,
          data: rowSelected,
          getFormValue,
          getProcedureResult,
          queryParams,
          ordenPagoData,
        })
        if (responsePostDelete?.data?.outBinds?.OutStatus === 'ERROR') {
          toast.error(responsePostDelete?.data?.outBinds?.OutMessage ?? 'Error al guardar')
        }
      }

      refetchDetalleOrden()

      if (!isDeleted) editionModal?.handleShow()
    },
  })

  const onSubmit = async () => {
    const triggerValidation = await trigger()

    if (!triggerValidation) {
      return
    }

    const allData = getValues()

    const dataFiltered = filterData(inputs, allData)

    if (rowSelected) {
      submitRuntime({
        body: {
          detalle_orden: {
            where: {
              nit_compania,
              ...queryParamsPks,
              nro_detalle: rowSelected?.nro_detalle,
            },
            data: dataFiltered,
          },
        },

        bodyMethod: 'put',
      })

      return
    }

    const responseNroDetalle = await getQueryResultInputs(`SELECT
                                                              nvl(
                                                                  max(nro_detalle),
                                                                  0
                                                              ) + 1 nro_detalle
                                                          FROM
                                                              detalle_orden
                                                          WHERE
                                                                  nit_compania = ${nit_compania}
                                                              AND orden = ${queryParamsPks?.orden}`)

    const nro_detalle = responseNroDetalle?.data?.[0]?.nro_detalle

    submitRuntime({
      body: {
        blockId: 'detalle_orden',
        data: {
          ...dataFiltered,
          nro_detalle,
          orden: Number(queryParamsPks?.orden),
          nit_compania,
        },
      },
    })
  }

  const handleDelete = async (row) => {
    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: 'Confirmar',
      content: '¿Está seguro de eliminar el registro?',
      onConfirm: () => {
        deleteRecord({
          body: {
            blockId: 'detalle_orden',
            where: {
              nit_compania,
              orden: Number(queryParamsPks?.orden),
              nro_detalle: row?.nro_detalle,
            },
          },
        })
      },
    })
  }

  const columns = detalleOrdencolumns({ editOrAddRow, handleDelete, ordenPagoTipoCpto })

  return (
    <>
      <div className='flex justify-end p-2'>
        <Button
          startIcon={<AddCircle />}
          onClick={() => editOrAddRow()}
        >
          Agregar
        </Button>
      </div>
      <BasicTable
        containerProps={{
          className: 'h-[450px]',
        }}
        loading={deletingRecord || loadingDOrdenData}
        rows={detalleOrdenRows}
        columns={columns}
      />
      <SumaryTotal
        totals={totals}
        detalleOrdenValorNeto={detalleOrdenValorNeto}
      />
      {editionModal?.show && (
        <EditionModal
          editionModal={editionModal}
          rowSelected={rowSelected}
          onSubmit={onSubmit}
          control={control}
          inputs={inputs}
          loading={loadingSubmit || isPendingQueryInputs || isPendingProcedure}
        />
      )}
    </>
  )
}

export default DetalleOrden
