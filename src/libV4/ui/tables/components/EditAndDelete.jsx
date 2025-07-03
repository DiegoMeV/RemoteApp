import { Delete, Edit } from '@mui/icons-material'
import { ClassicIconButton } from '../../../../lib'

const EditAndDelete = (params, handleEdit, handleCancel) => {
  return (
    <div>
      <ClassicIconButton
        title='Editar'
        color='secondary'
        hoverColor='#1a73e8'
        onClick={() => handleEdit(params)}
      >
        <Edit />
      </ClassicIconButton>
      <ClassicIconButton
        title='Eliminar'
        color='secondary'
        hoverColor='red'
        onClick={() => handleCancel(params)}
      >
        <Delete />
      </ClassicIconButton>
    </div>
  )
}

export default EditAndDelete
