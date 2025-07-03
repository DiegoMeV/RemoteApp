import { Button } from '@mui/material'
import GenericMoney from '@/libV4/ui/inputs/GenericMoney'

const PacFooter = ({ total, onSave }) => (
  <>
    <div className='flex justify-end items-center px-8 py-4 bg-gray-50 border-t'>
      <GenericMoney
        label='Total'
        variant='standard'
        InputProps={{ style: { textAlign: 'right' }, readOnly: true }}
        sx={{ width: '160px' }}
        value={total}
      />
    </div>
    <footer className='flex justify-end px-4'>
      <Button
        variant='contained'
        onClick={onSave}
      >
        Guardar
      </Button>
    </footer>
  </>
)

export default PacFooter
