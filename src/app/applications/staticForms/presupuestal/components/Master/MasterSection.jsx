import { Button } from '@mui/material'
import { MasterTitle } from './components'
import { BackdropLoading, GenericForm } from '@/libV4'

const MasterSection = ({
  onSubmitedMasterSection,
  control,
  inputs,
  isPendingQuery,
  isPendingPushDataForm,
}) => {
  return (
    <section>
      <MasterTitle />
      <div className='p-2'>
        <BackdropLoading
          loading={isPendingQuery || isPendingPushDataForm}
          sizeLoading={80}
        />
        <div className='p-2.5  bg-backgroundWhite1-light rounded-md'>
          <div className='grid grid-cols-60 gap-4'>
            <GenericForm
              inputs={inputs}
              control={control}
            />
            <div className='col-span-60 flex justify-end items-center'>
              <Button
                variant='contained'
                onClick={onSubmitedMasterSection}
                sx={{
                  minWidth: '200px',
                }}
              >
                Guardar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MasterSection
