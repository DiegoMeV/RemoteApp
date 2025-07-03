import { FormatClear } from '@mui/icons-material'
import { ChartContainer } from '../Charts'
import { ClassicIconButton, GenericForm } from '@/libV4/ui'
import { Button } from '@mui/material'

const FilterDashboard = ({ title = '', form = {}, inputs = [], onSubmit = () => {} } = {}) => {
  return (
    <form
      className='col-span-12 h-100% rounded-lg shadow-lg'
      onSubmit={form?.handleSubmit(onSubmit)}
    >
      <ChartContainer
        title={title}
        minHeight='100%'
      >
        <div className='general_form_container py-2 px-4'>
          <GenericForm
            inputs={inputs}
            control={form?.control}
          />
        </div>
        <aside className='w-100% flex justify-end p-4 gap-4'>
          <ClassicIconButton
            onClick={() => form?.reset?.()}
            title='Limpiar'
          >
            <FormatClear />
          </ClassicIconButton>
          <Button
            variant='contained'
            type='submit'
            color='primary'
          >
            Aplicar filtro
          </Button>
        </aside>
      </ChartContainer>
    </form>
  )
}

export default FilterDashboard
