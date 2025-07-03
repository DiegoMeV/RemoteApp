import { useForm } from 'react-hook-form'
import { Button } from '@mui/material'
import toast from 'react-hot-toast'
import { GenericForm } from '../inputs'
import { useEffect } from 'react'
import { isEmpty } from '@/libV4/funcs'

const FormEditBasic = ({ inputs, defaultValues, submitForm, cancelForm }) => {
  const { control, reset, getValues, trigger } = useForm({})

  useEffect(() => {
    if (!isEmpty(defaultValues)) {
      reset(defaultValues)
      return
    }
    reset()
  }, [defaultValues, reset])

  const onSubmit = async () => {
    const responseTrigger = await trigger()
    if (responseTrigger) {
      const data = getValues()
      submitForm(data)
      return
    }
    toast.error('Por favor, complete los campos requeridos')
  }

  return (
    <form className='general_form_container'>
      <GenericForm
        inputs={inputs}
        control={control}
      />
      <div className='col-span-12 flex justify-end gap-2'>
        <Button
          variant='contained'
          color='error'
          onClick={cancelForm}
        >
          Cancelar
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={onSubmit}
        >
          Guardar
        </Button>
      </div>
    </form>
  )
}

export default FormEditBasic
