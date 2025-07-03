import { Button } from '@mui/material'
import { MasterTitle } from './components'
import { BackdropLoading, GenericForm } from '@/libV4'

const MasterSection = ({
  form,
  globalVariables,
  masterInputs,
  ordenPagouData,
  loadingOrdenPagouData,
  bloquearBloques,
  loadingBackdrop,
  onSubmit,
}) => {
  return (
    <section className={`${bloquearBloques ? 'pointer-events-none' : ''}`}>
      <MasterTitle
        globalVariables={globalVariables}
        ordenPagouData={ordenPagouData}
      />
      <div className='relative p-[10px]'>
        <BackdropLoading
          loading={loadingBackdrop || loadingOrdenPagouData}
          sizeLoading={80}
          sx={{
            position: 'absolute',
            borderRadius: '5px',
            zIndex: 1,
          }}
        />
        <div className='backgroundwhite1 p-2 rounded-lg'>
          <div className='grid grid-cols-36 gap-4'>
            <GenericForm
              inputs={masterInputs}
              control={form.control}
            />
            <div className='general_form_item md:col-span-7'>
              <Button
                variant='contained'
                fullWidth
                onClick={onSubmit}
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
