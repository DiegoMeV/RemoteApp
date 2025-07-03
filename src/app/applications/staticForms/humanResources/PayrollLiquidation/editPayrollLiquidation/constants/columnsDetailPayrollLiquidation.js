import { Button } from '@mui/material'

export const columnsDetailPayrollLiquidation = ({ volantePagoModal, handleGetVolante }) => {
  const handleOpenModal = (params) => {
    handleGetVolante(params?.row ?? {})
    volantePagoModal?.handleShow()
  }
  return [
    {
      field: 'tercero',
      headerName: 'Empleado',
      width: 200,
    },
    {
      field: 'nombre_empleado',
      headerName: 'Nombre',
      minWidth: 300,
    },
    {
      field: 'nro_dias_trabajados',
      headerName: 'Dias',
      width: 100,
    },
    {
      field: 'estado_liq',
      headerName: 'Estado',
      width: 200,
    },
    {
      field: 'options',
      headerName: '',
      width: 200,
      renderCell: (params) => {
        const isliquidated = params?.row?.estado_liq === 'Ok'
        return (
          <div className='flex w-full justify-center'>
            <Button
              variant='contained'
              size='small'
              disabled={!isliquidated}
              onClick={() => {
                handleOpenModal(params)
              }}
            >
              Volante de pago
            </Button>
          </div>
        )
      },
    },
  ]
}
