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
  postSubmit,
  QUERY_DETALLE_ORDEN,
} from './funcs'
import { BasicTable, useOracleExecutes, useQueryOracle } from '@/libV4'
import { keyName } from '../../../../constants'
import { filterData } from '../../../../funcs'
import { EditionModal, SumaryTotal } from './components'
import { useSubmitHooks } from '../../../../hooks'
import { useStoreActions } from 'easy-peasy'
import toast from 'react-hot-toast'
import { onClickRegenerarValor } from '../../../Master/funcs'

const DetalleOrden = ({
  nit_compania,
  queryParamsPks,
  getFormValue,
  commonPostInsert,
  commonPostUpdate,
  onSubmitMaster,
  setFormValue,
  ordenPagouData,
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
    getFunctionResult,
    getProcedureResult,
    isPendingQuery: isPendingQueryInputs,
    isPendingFunction,
    isPendingProcedure,
  } = useOracleExecutes()

  const {
    data: detalleOrdenData = {},
    isFetching: loadingDOrdenData = false,
    refetch: refetchDetalleOrden,
  } = useQueryOracle({
    query: QUERY_DETALLE_ORDEN({ nit_compania, queryParamsPks }),
    enabled: !!queryParamsPks?.orden,
    queryKey: ['detalleOrdenData', queryParamsPks?.orden],
  })

  const totals = calculateTotal(detalleOrdenRows)

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
    ordenPagouData,
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
    getData: async ({ isDeleted, response } = {}) => {
      if (!isDeleted) {
        if (rowSelected?.nromovdopu) {
          const responsePostUpdate = await commonPostUpdate()

          if (responsePostUpdate?.data?.outBinds?.OutStatus === 'ERROR') {
            toast.error(
              responsePostUpdate?.data?.outBinds?.OutMessage ??
                'Error al realizar general post update'
            )
          }
        } else {
          const responseGeneralPI = await commonPostInsert()

          if (responseGeneralPI?.data?.outBinds?.OutStatus === 'ERROR') {
            toast.error(
              responseGeneralPI?.data?.outBinds?.OutMessage ??
                'Error al realizar general post insert'
            )
          }
        }

        const responsePostSubmit = await postSubmit({
          nit_compania,
          data: response?.data?.[0],
          getProcedureResult,
        })

        if (responsePostSubmit?.data?.outBinds?.OutStatus === 'ERROR') {
          toast.error(responsePostSubmit?.data?.outBinds?.OutMessage ?? 'Error al guardar')
        }
      } else {
        const responsePostDelete = await postDelete({
          nit_compania,
          data: rowSelected,
          getFormValue,
          getProcedureResult,
        })

        if (responsePostDelete?.data?.outBinds?.OutStatus === 'ERROR') {
          toast.error(responsePostDelete?.data?.outBinds?.OutMessage ?? 'Error al guardar')
        }
      }

      await onClickRegenerarValor({
        getFormValue,
        nit_compania,
        queryParamsPks,
        getProcedureResult,
        setFormValue,
        onSubmit: onSubmitMaster,
      })

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
          dorden_pagou: {
            where: {
              nit_compania,
              ...queryParamsPks,
              nromovdopu: rowSelected?.nromovdopu,
            },
            data: dataFiltered,
          },
        },

        bodyMethod: 'put',
      })

      return
    }

    const responseFunction = await getFunctionResult({
      packageName: 'pkg_consecutivos_opu',
      functionName: 'seq_nromovdopu',
      params: {
        pCompania: nit_compania,
      },
    })

    const nromovdopu = responseFunction?.data

    submitRuntime({
      body: {
        blockId: 'dorden_pagou',
        data: {
          ...dataFiltered,
          tipo_contrato: getFormValue('orden_pagou.tipo_contrato'),
          nro_contrato: getFormValue('orden_pagou.nro_contrato'),
          orden: Number(queryParamsPks?.orden),
          nromovdopu,
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
            blockId: 'dorden_pagou',
            where: {
              nit_compania,
              orden: Number(queryParamsPks?.orden),
              nromovdopu: row?.nromovdopu,
              tipo_contrato: row?.tipo_contrato,
              nro_contrato: row?.nro_contrato,
              nro_detalle_contrato: row?.nro_detalle_contrato,
              cpto_gasto: row?.cpto_gasto,
            },
          },
        })
      },
    })
  }

  const columns = detalleOrdencolumns({ editOrAddRow, handleDelete })

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
      <SumaryTotal totals={totals} />
      {editionModal?.show && (
        <EditionModal
          editionModal={editionModal}
          rowSelected={rowSelected}
          onSubmit={onSubmit}
          control={control}
          inputs={inputs}
          loading={loadingSubmit || isPendingFunction || isPendingQueryInputs || isPendingProcedure}
        />
      )}
    </>
  )
}

export default DetalleOrden
