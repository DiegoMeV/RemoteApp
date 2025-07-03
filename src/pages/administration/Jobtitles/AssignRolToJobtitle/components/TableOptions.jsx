import { Delete, Menu } from '@mui/icons-material'
import { ClassicIconButton } from '@/lib'

const TableOptions = ({ data, deleteRol, showPrivileges }) => {
  return (
    <div className='flex justify-center items-center'>
      <ClassicIconButton
        title='Eliminar'
        onClick={() => deleteRol(data)}
        color='secondary'
      >
        <Delete />
      </ClassicIconButton>
      <ClassicIconButton
        title='Ver privilegios'
        onClick={() => showPrivileges(data)}
        color='secondary'
      >
        <Menu />
      </ClassicIconButton>
    </div>
  )
}

export default TableOptions
