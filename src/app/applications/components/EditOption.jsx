import { ClassicIconButton } from '@/lib'
import { Edit } from '@mui/icons-material'

const EditOption = ({ onClick }) => {
  return (
    <ClassicIconButton
      color='secondary'
      onClick={onClick}
      title='Editar'
    >
      <Edit />
    </ClassicIconButton>
  )
}

export default EditOption
