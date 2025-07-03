import { ClassicIconButton } from '@/lib'
import { Delete } from '@mui/icons-material'
import { Box } from '@mui/material'

const TableOptions = ({ params, handleDeleteClick }) => {
  return (
    <Box mx='auto'>
      <ClassicIconButton
        color='secondary'
        onClick={() => handleDeleteClick(params.id)}
      >
        <Delete />
      </ClassicIconButton>
    </Box>
  )
}

export default TableOptions
