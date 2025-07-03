import { GenericMoney } from '@/lib'
import { Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { BackdropLoading, BasicTable, useOracleExecutes, useQueryOracle } from '@/libV4'
import { calculateSum, imputacionContableColumns, QUERY_IMPUTACION_CONTABLE } from './funcs'

const ImputacionContable = ({ nit_compania, queryParamsPks }) => {
  const [imputacionContableRows, setImputacionContableRows] = useState([])

  const { isPendingProcedure } = useOracleExecutes()

  const {
    data: impContableData,
    isFetching: loadingIC,
    // refetch: refetchIP,
  } = useQueryOracle({
    query: QUERY_IMPUTACION_CONTABLE({ nit_compania, queryParamsPks }),
    enabled: !!queryParamsPks?.orden,
    queryKey: ['imputacionContableOrdenPago', nit_compania, queryParamsPks?.orden],
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
