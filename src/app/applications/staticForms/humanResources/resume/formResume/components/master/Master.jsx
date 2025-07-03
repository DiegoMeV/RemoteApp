import { GenericForm } from '@/libV4'
import { inputsResume } from './constants'
import { ResumePhoto } from './components'
import { Button } from '@mui/material'

const Master = ({ form, division }) => {
  const inputs = inputsResume({ division })

  return (
    <div className='backgroundwhite1 flex flex-row gap-4 p-8 pt-10'>
      <div className='w-1/5'>
        <ResumePhoto />
      </div>
      <div className='flex flex-col gap-2 w-4/5 justify-between'>
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

export default Master
