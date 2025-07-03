import { Button } from '@mui/material'

const PacHeader = ({ onClick }) => (
  <header className='flex justify-end px-4'>
    <Button
      variant='outlined'
      onClick={onClick}
    >
      Agregar nuevo
    </Button>
  </header>
)

export default PacHeader
