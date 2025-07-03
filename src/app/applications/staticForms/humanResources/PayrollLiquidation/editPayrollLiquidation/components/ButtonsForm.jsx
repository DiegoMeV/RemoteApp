import { Button, Typography } from '@mui/material'
import { StatusMessage } from '../../../components'
import { useTheme } from '@emotion/react'

const ButtonsForm = ({
  jobStatusData,
  showJobStatus,
  setShowJobStatus,
  handleChargeEmployees,
  handleCallOracleReport,
  confirmDelete,
  isIdMatchingJobStatus,
  isNew,
  isLiquidated,
  arePendingChanges,
  procesessModal,
  dataPayrollProcesses,
}) => {
  const theme = useTheme()

  return (
    <div className='py-2 flex flex-col col-span-12 items-center space-y-10'>
      <div className='relative flex flex-col items-center space-y-4 pt-4 w-full max-w-[1050px]'>
        <Button
          variant='contained'
          className=' lg:w-[150px]'
          type='submit'
          disabled={isLiquidated || !arePendingChanges}
        >
          Guardar
        </Button>
        <Typography
          variant='body1'
          color='secondary'
          align='center'
        >
          Antes de radicar, es indispensable que guarde los cambios.
        </Typography>
        {showJobStatus && isIdMatchingJobStatus && (
          <StatusMessage
            status={jobStatusData?.status}
            onClose={() => setShowJobStatus(false)}
            message={`Proceso con nomina ${jobStatusData?.identifier}`}
          />
        )}
      </div>
      <div className='flex flex-wrap gap-2'>
        <Button
          variant='contained'
          onClick={() => procesessModal?.handleShow()}
          className='text-sm px-4 py-2 w-[220px] flex items-center justify-between relative'
        >
          <div className='flex-1 text-center'>Procesos</div>
          <div className='absolute right-6'>
            <div
              className='bg-white text-sm rounded-full px-2 min-w-[1.5rem] text-center'
              style={{ color: theme.palette.primary.main }}
            >
              {dataPayrollProcesses?.data?.length || 0}
            </div>
          </div>
        </Button>

        <Button
          variant='contained'
          onClick={() => handleChargeEmployees()}
          disabled={isNew || isLiquidated || arePendingChanges}
          className='text-sm px-4 py-2 w-[220px]'
        >
          Cargar empleados
        </Button>
        <Button
          variant='contained'
          onClick={() => handleCallOracleReport()}
          disabled={isNew}
          className='text-sm px-4 py-2 w-[220px]'
        >
          Volantes de pago
        </Button>
        {/* TO DO: future endpoint
        <Button
          variant='contained'
          onClick={() => {}}
          disabled={isNew || isLiquidated}
          className='text-sm px-4 py-2 w-[220px]'
        >
          Correo
        </Button> */}
        <Button
          variant='contained'
          color='error'
          onClick={() => confirmDelete()}
          disabled={isNew || isLiquidated}
          className='text-sm px-4 py-2 w-[220px]'
        >
          Eliminar nómina
        </Button>
      </div>
    </div>
  )
}

export default ButtonsForm
