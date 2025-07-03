import { Button, Typography } from '@mui/material'
import { StatusMessage } from '../../../components'

const ButtonsForm = ({
  jobStatusData,
  showJobStatus,
  setShowJobStatus,
  handleGetDetail,
  handleDownloadTxt,
  handleChargeAutoliq,
  handleDeletePlanilla,
  handleCallOracleReport,
  isSequenceMatchingJobStatus,
  isNew,
  isPayed,
  arePendingChanges,
}) => {
  return (
    <div className='py-2 flex flex-col col-span-12 items-center space-y-10'>
      <div className='relative flex flex-col items-center space-y-4 pt-4 w-full max-w-[1050px]'>
        <Button
          variant='contained'
          type='submit'
          disabled={isPayed || !arePendingChanges}
          className=' lg:w-[150px]'
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
        {showJobStatus && isSequenceMatchingJobStatus && (
          <StatusMessage
            status={jobStatusData?.status}
            onClose={() => setShowJobStatus(false)}
            message={`Proceso planilla ${jobStatusData?.identifier}`}
          />
        )}
      </div>
      <div className='buttonsContainer'>
        <Button
          variant='contained'
          onClick={() => handleChargeAutoliq()}
          disabled={isNew || jobStatusData?.isExecuting || isPayed || arePendingChanges}
          size='small'
          className='flex-1 min-w-0'
        >
          Cargar autoliquidación
        </Button>
        <Button
          variant='contained'
          onClick={() => handleGetDetail()}
          size='small'
          className='flex-1 min-w-0'
        >
          Consultar detalle
        </Button>
        <Button
          variant='contained'
          onClick={() => handleDownloadTxt()}
          size='small'
          className='flex-1 min-w-0'
        >
          Generar plano
        </Button>
        <Button
          variant='contained'
          onClick={() => handleCallOracleReport()}
          size='small'
          className='flex-1 min-w-0'
        >
          Reporte
        </Button>
        <Button
          variant='contained'
          onClick={() => handleDeletePlanilla()}
          disabled={isNew || jobStatusData?.isExecuting || isPayed || arePendingChanges}
          size='small'
          className='flex-1 min-w-0'
        >
          Eliminar planilla
        </Button>
      </div>
    </div>
  )
}

export default ButtonsForm
