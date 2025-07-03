import { GenericMoney } from '@/lib'
import { Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { BackdropLoading, BasicTable, useOracleExecutes, useQueryOracle } from '@/libV4'
import {
  calculateSum,
  getParamsImpuesto,
  imputacionContableColumns,
  QUERY_IMPUTACION_CONTABLE,
} from './funcs'

const ImputacionContable = ({ nit_compania, queryParamsPks, getFormValue }) => {
  const [imputacionContableRows, setImputacionContableRows] = useState([])

  const { getProcedureResult, isPendingProcedure } = useOracleExecutes()

  const {
    data: impContableData,
    isFetching: loadingIC,
    refetch: refetchIP,
  } = useQueryOracle({
    query: QUERY_IMPUTACION_CONTABLE({ nit_compania, queryParamsPks }),
    enabled: !!queryParamsPks?.orden,
    queryKey: ['imputacionContable', nit_compania, queryParamsPks?.orden],
  })

  useEffect(() => {
    if (queryParamsPks?.orden) {
      const data = impContableData?.data
      const newRows = data?.map?.((row) => ({
        id: crypto.randomUUID(),
        ...row,
      }))
      setImputacionContableRows(newRows)
    }
  }, [nit_compania, queryParamsPks?.orden, impContableData])

  const recalcularImpuesto = async () => {
    const validateTipos = ['ANTICIPO', 'FINAL']
    const tipoOrden = getFormValue('orden_pagou.tipo_orden')
    const recalcularImpuestos = getFormValue('orden_pagou.recalcular_impuesto')
    const recalcularValidation = validateTipos?.includes(tipoOrden)

    if (recalcularImpuestos && recalcularValidation) {
      return
    }

    const params = getParamsImpuesto({ nit_compania, queryParamsPks, getFormValue })

    const response = await getProcedureResult({
      statement:
        'BEGIN siif.und_ordenu.generarImputacionmultient(:UnaCompania,:UnaOrden,:UnaLegalizacion,:UnComprobanteAlm,:UnTipoCA,:UnContrato,:UnTipoContrato,:UnValor,:UnIva,:UnTipo,:UnTercero,:UnTerceroType,:Unafecha,:UnaClasePago,:UntipoOrden); END;',
      params,
    })

    if (response?.success) {
      refetchIP()
    }
  }

  const { debTotal, cretTotal } = calculateSum(imputacionContableRows)

  return (
    <>
      <BackdropLoading
        loading={isPendingProcedure}
        sizeLoading={80}
        sx={{
          position: 'absolute',
          borderRadius: '5px',
          zIndex: 1000,
        }}
      />
      <div className='flex justify-end p-2'>
        <Button
          variant='contained'
          size='small'
          onClick={recalcularImpuesto}
        >
          Recalcular impuesto contable
        </Button>
      </div>
      <BasicTable
        containerProps={{
          className: 'h-[450px]',
        }}
        loading={loadingIC}
        rows={imputacionContableRows}
        rowHeight={52}
        columns={imputacionContableColumns}
      />
      <div className='flex flex-col gap-2 pt-2'>
        <div className=' flex gap-2 items-center'>
          <Typography
            variant='body1'
            fontWeight='bold'
          >
            Sumas iguales
          </Typography>
          <GenericMoney
            value={debTotal}
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
          <GenericMoney
            value={cretTotal}
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
    </>
  )
}

export default ImputacionContable
