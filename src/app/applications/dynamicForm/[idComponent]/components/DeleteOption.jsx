import { ClassicIconButton } from '@/lib'
import { Delete } from '@mui/icons-material'

const DeleteOption = ({ onClick }) => {
  return (
    <ClassicIconButton
      color='secondary'
      onClick={onClick}
    >
      <Delete />
    </ClassicIconButton>
  )
}

export default DeleteOption
