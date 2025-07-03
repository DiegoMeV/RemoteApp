import { SquareIconButton } from '@/lib'
import { useApis } from './useApis'
import { BackdropLoading } from '@/libV4'
import { Box } from '@mui/material'
import { LoadingMassive } from '@/app/audit/expedient/components'

const ApplyGenReport = ({ idMassiveActivity, queueInfo, getMassiveActivitiesQueue }) => {
  const { manageMassiveExpedients, isPendingManageMassiveExpedients } = useApis({
    idMassiveActivity,
    getMassiveActivitiesQueue,
  })
  return (
    <Box
      position='relative' overflow='auto' className='h-full py-2' 
    >
      <BackdropLoading loading={isPendingManageMassiveExpedients} />
      <div className='w-full h-full flex flex-col justify-center items-center text-center font-bold text-lg gap-10'>
        En este paso se va a iniciar el proceso de aplicación de la actividad seleccionada a los
        expedientes
        <SquareIconButton
          color='primary'
          text={'Aplicar'}
          onClick={() => {
            manageMassiveExpedients()
          }}
          sx={{
            width: '20%',
            height: '50px',
          }}
          size='middle'
        />
      </div>
      {['QUEUED', 'INPROGRESS'].includes(queueInfo?.[0]?.status) && (
        <LoadingMassive queueInfo={queueInfo} />
      )}
    </Box>
  )
}

export default ApplyGenReport
