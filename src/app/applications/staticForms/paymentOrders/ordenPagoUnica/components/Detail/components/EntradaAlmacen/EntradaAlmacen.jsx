import { useBoolean } from '@/lib'
import { AddCircle } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import {
  calculateTotal,
  entradaAlmacenColumns,
  entradaAlmacenLOVColumns,
  LOV_ENTRADA_ALMACEN,
  QUERY_ENTRADA_ALMACEN,
} from './funcs'
import { Button } from '@mui/material'
import { BasicTable, useOracleExecutes, useQueryOracle, ValueListQuery } from '@/libV4'
import { SumaryTotal } from './components'
import { keyName } from '../../../../constants'
import { useSubmitHooks } from '../../../../hooks'
import { useStoreActions } from 'easy-peasy'
import toast from 'react-hot-toast'
import { onClickRegenerarValor } from '../../../Master/funcs'

const EntradaAlmacen = ({
  nit_compania,
  queryParamsPks,
  getFormValue,
  onSubmitMaster,
  setFormValue,
  commonPostInsert,
}) => {
  const modalToAddRows = useBoolean(null, {
    content: '¿Está seguro de cancelar los cambios?',
    icon: 'warning',
  })

  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )

  const [entradaAlmacenRows, setEntradaAlmacenRows] = useState([])

  const { getProcedureResult, isPendingProcedure } = useOracleExecutes()

  const {
    data: entradaAlmacenData = {},
    isFetching: loadingEA = false,
    refetch: refetchEntradaAlmacen,
  } = useQueryOracle({
    query: QUERY_ENTRADA_ALMACEN({ nit_compania, queryParamsPks }),
    enabled: !!queryParamsPks?.orden,
    queryKey: ['entradaAlmacen', nit_compania, queryParamsPks?.orden],
  })

  useEffect(() => {
    if (queryParamsPks?.orden && entradaAlmacenData) {
      const data = entradaAlmacenData?.data

      const newRows = data?.map?.((row) => {
        return {
          id: crypto.randomUUID(),
          ...row,
        }
      })
      setEntradaAlmacenRows(newRows)
    }
  }, [nit_compania, queryParamsPks?.orden, entradaAlmacenData])

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
      await onClickRegenerarValor({
        getFormValue,
        nit_compania,
        queryParamsPks,
        getProcedureResult,
        setFormValue,
        onSubmit: onSubmitMaster,
      })

      refetchEntradaAlmacen()
    },
  })

  const onSubmit = async (row) => {
    await submitRuntime({
      body: {
        blockId: 'entradas_ordenu',
        data: {
          nit_compania,
          nrodoc: Number(row?.nrodoc),
          tipo: getFormValue('orden_pagou.tipo'),
          orden: Number(queryParamsPks?.orden),
          tipo_comprobante_alm: row?.tipo_comprobante_alm,
          nro_comprobantealm: row?.nro_comprobantealm,
          valor: Number(row?.valor),
          iva: Number(row?.iva),
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
            blockId: 'entradas_ordenu',
            where: {
              nit_compania,
              orden: Number(queryParamsPks?.orden),
              tipo: getFormValue('orden_pagou.tipo'),
              tipo_comprobante_alm: row?.tipo_comprobante_alm,
              nro_comprobantealm: row?.nro_comprobantealm,
              nrodoc: Number(row?.nrodoc),
            },
          },
        })
      },
    })
  }

  const columns = entradaAlmacenColumns({ handleDelete })

  return (
    <>
      <div className='flex justify-end p-2'>
        <Button
          startIcon={<AddCircle />}
          onClick={() => modalToAddRows?.handleShow()}
        >
          Agregar
        </Button>
      </div>
      <BasicTable
        containerProps={{
          className: 'h-[450px]',
        }}
        loading={loadingEA || deletingRecord || isPendingProcedure}
        rows={entradaAlmacenRows}
        columns={columns}
      />
      <SumaryTotal totals={calculateTotal(entradaAlmacenRows)} />

      {modalToAddRows?.show && (
        <ValueListQuery
          show={modalToAddRows?.show}
          handleShow={modalToAddRows?.handleShow}
          handleShowConfirm={modalToAddRows?.handleShowConfirm}
          selectedOption={(row) => onSubmit(row)}
          loadingSubmit={loadingSubmit}
          closeOnSelect={false}
          queryProps={{
            lovQuery: LOV_ENTRADA_ALMACEN({ nit_compania, queryParamsPks, getFormValue }),
          }}
          tableProps={{
            columns: entradaAlmacenLOVColumns,
          }}
        />
      )}
    </>
  )
}

export default EntradaAlmacen
