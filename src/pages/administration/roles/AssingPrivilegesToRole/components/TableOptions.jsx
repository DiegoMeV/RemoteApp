import { ClassicIconButton } from '@/lib'
import { Delete } from '@mui/icons-material'

const TableOptions = ({ data, deletePriv }) => {
  return (
    <div className='flex justify-center'>
      <ClassicIconButton
        title='Eliminar'
        onClick={() => deletePriv?.(data)}
      >
        <Delete />
      </ClassicIconButton>
    </div>
  )
}

export default TableOptions
