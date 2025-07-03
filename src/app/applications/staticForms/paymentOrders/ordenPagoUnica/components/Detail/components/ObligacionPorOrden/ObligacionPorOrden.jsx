import { GenericMoney, useBoolean } from '@/lib'
import { Button, Typography } from '@mui/material'
import { BasicTable, useOracleExecutes, useQueryOracle, ValueListQuery } from '@/libV4'
import { useEffect, useState } from 'react'
import {
  columnsObligacionPorOrden,
  columnsObligacionPorOrdenModal,
  LOV_OBLICACION_W,
  nroDocCompptalValidation,
  QUERY_OBLIGACION_POR_ORDEN,
} from './funcs'
import { keyName } from '../../../../constants'
import { useStoreActions } from 'easy-peasy'
import { useSubmitHooks } from '../../../../hooks'
import toast from 'react-hot-toast'

const ObligacionPorOrden = ({ nit_compania, queryParamsPks, getFormValue, commonPostInsert }) => {
  const modalToAddRows = useBoolean(null, {
    content: '¿Está seguro de cancelar los cambios?',
    icon: 'warning',
  })
  const [obligacionPorOrdenRows, setObligacionPorOrdenRows] = useState([])

  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )

  const {
    data: obliPorOrdenData,
    isFetching: loadingObliPorOrden,
    refetch: refetchObliPorOrden,
  } = useQueryOracle({
    query: QUERY_OBLIGACION_POR_ORDEN({ nit_compania, queryParamsPks }),
    enabled: !!queryParamsPks?.orden,
    queryKey: ['obligacionesPorOrden', nit_compania, queryParamsPks?.orden],
  })

  useEffect(() => {
    if (queryParamsPks?.orden && obliPorOrdenData) {
      const data = obliPorOrdenData?.data
      const newRows = data?.map?.((row) => ({
        id: crypto.randomUUID(),
        ...row,
      }))
      setObligacionPorOrdenRows(newRows)
    }
  }, [nit_compania, queryParamsPks?.orden, obliPorOrdenData])

  const { getProcedureResult, isPendingProcedure } = useOracleExecutes()

  const { submitRuntime, deleteRecord, loadingSubmit, deletingRecord } = useSubmitHooks({
    keyName,
    getData: async ({ isDeleted }) => {
      if (!isDeleted) {
        const responseGeneralPI = await commonPostInsert()

        if (responseGeneralPI?.data?.outBinds?.OutStatus === 'ERROR') {
          toast.error(
            responseGeneralPI?.data?.outBinds?.OutMessage ?? 'Error al realizar general post insert'
          )
        }
      }
      refetchObliPorOrden()
    },
  })

  const handleDelete = async (row) => {
    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: 'Confirmar',
      content: '¿Está seguro de eliminar el registro?',
      onConfirm: () => {
        const estado_orden_pagou = getFormValue('orden_pagou.estado')
        if (estado_orden_pagou !== 'V') {
          toast.error('No se puede eliminar la obligación, ya que la orden de pago no está vigente')
          return
        }

        const where = {
          nit_compania,
          orden: Number(queryParamsPks?.orden),
          nro_comprobantepptal: row?.nro_comprobantepptal,
          nrodoc_compptal: row?.nrodoc_compptal,
        }

        deleteRecord({
          body: {
            blockId: 'obli_por_ordenu',
            where,
          },
        })
      },
    })
  }

  const onSubmit = async (row) => {
    const data = {
      nit_compania,
      orden: Number(queryParamsPks?.orden),
      nro_comprobantepptal: row?.nro_comprobantepptal,
      tipo_compptal: row?.tipo_compptal,
      nrodoc_compptal: row?.nrodoc,
    }

    const someNull = Object.values(data).some((value) => !value || value === '')

    Object.keys(data).forEach((key) => {
      if (!data?.[key] || data?.[key] === '') {
        toast.error(`El campo ${key} no puede ser nulo`)
        return
      }
    })

    const responseNroDocCompptalValidation = await nroDocCompptalValidation({
      nit_compania,
      data,
      getFormValue,
      getProcedureResult,
    })
    if (
      responseNroDocCompptalValidation?.data?.outBinds?.OutStatus === 'ERROR' ||
      !responseNroDocCompptalValidation?.success
    ) {
      toast.error(
        responseNroDocCompptalValidation?.data?.outBinds?.OutMessage ??
          'Error al validar el número de documento contable'
      )
      return
    }

    if (!someNull) {
      submitRuntime({
        body: {
          blockId: 'obli_por_ordenu',
          data,
        },
      })
    }
  }

  const calculateTotal = () => {
    let total = 0

    obligacionPorOrdenRows?.forEach((element) => {
      total += Number(element?.valor)
    })

    return total
  }

  return (
    <>
      <div className='flex justify-end p-2'>
        <Button
          variant='contained'
          size='small'
          onClick={modalToAddRows?.handleShow}
        >
          Registrar obligacion
        </Button>
      </div>
      <BasicTable
        containerProps={{
          className: 'h-[450px]',
        }}
        loading={loadingObliPorOrden || deletingRecord}
        rows={obligacionPorOrdenRows}
        columns={columnsObligacionPorOrden({ handleDelete, getFormValue })}
      />
      <div className='flex flex-col items-end gap-2 pt-2 w-full'>
        <div className='flex gap-x-2 items-center'>
          <Typography
            variant='body1'
            fontWeight='bold'
          >
            Total
          </Typography>
          <GenericMoney
            value={calculateTotal()}
            variant='standard'
            InputProps={{
              style: {
                textAlign: 'right',
              },
            }}
            sx={{
              width: '140px',
            }}
          />
        </div>
      </div>

      {modalToAddRows?.show && (
        <ValueListQuery
          show={modalToAddRows?.show}
          handleShow={modalToAddRows?.handleShow}
          handleShowConfirm={modalToAddRows?.handleShowConfirm}
          selectedOption={(row) => onSubmit(row)}
          closeOnSelect={false}
          loadingSubmit={loadingSubmit || isPendingProcedure}
          queryProps={{
            lovQuery: LOV_OBLICACION_W({ nit_compania, queryParamsPks, getFormValue }),
          }}
          tableProps={{
            columns: columnsObligacionPorOrdenModal(),
          }}
        />
      )}
    </>
  )
}

export default ObligacionPorOrden
