import { GenericForm } from '@/libV4'
import { useForm } from 'react-hook-form'
import { inputsAcademicFormation } from '../constants'
import { Button } from '@mui/material'

const AcademicFormationForm = ({ modalAcademicFormation }) => {
  const form = useForm()
  const inputs = inputsAcademicFormation()
  return (
    <div className='backgroundGray1 p-4 rounded-lg shadow-xl border m-4'>
      <div className='backgroundwhite1 rounded-lg shadow-xl border p-8 space-y-8'>
        <form className='general_form_container'>
          <GenericForm
            control={form.control}
            inputs={inputs}
          />
        </form>
        <div className='w-full flex justify-between'>
          <Button
            variant='contained'
            className='text-sm px-4 py-2 w-[160px]'
            color='secondary'
            onClick={() => modalAcademicFormation?.handleShow()}
          >
            Cancelar
          </Button>
          <Button
            variant='contained'
            type='submit'
            className='text-sm px-4 py-2 w-[160px]'
          >
            Guardar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AcademicFormationForm
