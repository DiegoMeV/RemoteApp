import { ClassicIconButton } from '@/lib'
import { Save } from '@mui/icons-material'
import { Box } from '@mui/material'

const RenderCellAlertsReview = ({ id, handleSaveClick }) => {
  return (
    <Box
      display='flex'
      justifyContent='center'
      width='100%'
    >
      <ClassicIconButton
        color='secondary'
        title='Guardar'
        onClick={() => handleSaveClick(id)}
      >
        <Save />
      </ClassicIconButton>
    </Box>
  )
}

export default RenderCellAlertsReview
