import { PhotoCamera } from '@mui/icons-material'
import { Button } from '@mui/material'

const ResumePhoto = () => {
  return (
    <div className='flex flex-col items-center gap-6'>
      <div className='w-44 h-48 bg-gray-300 rounded-xl shadow-md'></div>
      <Button
        variant='contained'
        component='label'
        startIcon={<PhotoCamera />}
        className='!bg-blue-500 hover:!bg-blue-600 text-white font-bold py-2 px-4 rounded'
      >
        CARGAR FOTO
        <input
          type='file'
          hidden
          accept='image/*'
        />
      </Button>
    </div>
  )
}

export default ResumePhoto
