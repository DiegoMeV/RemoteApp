import { Button } from '@mui/material'
import { BackdropLoading, GenericForm } from '@/libV4'
import { inputsOrdenadorPago } from './funcs'
import { useEffect } from 'react'

const OrdenadorPago = ({
  nit_compania,
  controlMaster,
  onSubmitMaster,
  loadingSubmitMaster,
  setFormValue,
  ordenPagoData,
}) => {
  const inputs = inputsOrdenadorPago({ nit_compania, setFormValue })

  useEffect(() => {
    if (ordenPagoData?.data?.[0]) {
      const data = ordenPagoData?.data?.[0]
      setFormValue('orden_pago.tercero_sol', data?.tercero_sol)
      setFormValue('orden_pago.tercero_type_sol', data?.tercero_type_sol)
      setFormValue('orden_pago.nombre_tercero_sol', data?.nombre_tercero_sol)
      setFormValue('orden_pago.tercero_ordenador', data?.tercero_ordenador)
      setFormValue('orden_pago.nombre_tercero_ordenador', data?.nombre_tercero_ordenador)
      setFormValue('orden_pago.tercero_type_ordenador', data?.tercero_type_ordenador)
    }
  }, [ordenPagoData])

  return (
    <>
      <div className='relative p-[10px]'>
        <BackdropLoading
          loading={loadingSubmitMaster}
          sizeLoading={80}
          sx={{
            position: 'absolute',
            borderRadius: '5px',
            zIndex: 1,
          }}
        />
        <div className='backgroundwhite1 p-2 rounded-lg'>
          <div className='grid grid-cols-12 gap-4'>
            <GenericForm
              inputs={inputs}
              control={controlMaster}
            />
            <div className='col-span-12 flex justify-end'>
              <Button
                variant='contained'
                onClick={onSubmitMaster}
                sx={{
                  minWidth: '150px',
                }}
              >
                Guardar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrdenadorPago
