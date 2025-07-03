import { GenericForm } from '@/libV4'
import { inputsBasicData } from './constants'
import { useForm } from 'react-hook-form'
import { Button } from '@mui/material'

const BasicData = () => {
  const form = useForm()
  const inputs = inputsBasicData()
  return (
    <div className='backgroundwhite1 p-8 pt-10'>
      <div className='flex flex-col gap-10 justify-between'>
        <form className='grid grid-cols-12 gap-6 p-2'>
          <GenericForm
            control={form.control}
            inputs={inputs}
          />
        </form>
        <div className='w-full flex justify-end'>
          <Button
            variant='contained'
            type='submit'
            className='text-sm px-4 py-2 w-[200px]'
          >
            Guardar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default BasicData
