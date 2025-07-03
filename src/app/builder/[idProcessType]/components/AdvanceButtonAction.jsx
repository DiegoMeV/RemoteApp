import { Box } from '@mui/material'
import { Delete, Save } from '@mui/icons-material'
import { ClassicIconButton } from '@/lib'

const AdvanceButtonAction = ({ handleDeleteAction, handleSaveAction }) => {
  return (
    <Box sx={{ display: 'flex', gap: '6px' }}>
      <ClassicIconButton
        onClick={(event) => {
          event.stopPropagation()
          handleSaveAction()
        }}
        title='Guardar accion'
        placement='bottom'
        color='default'
      >
        <Save />
      </ClassicIconButton>
      <ClassicIconButton
        onClick={(event) => {
          event.stopPropagation()
          handleDeleteAction()
        }}
        title='Eliminar accion'
        placement='bottom'
        color='secondary'
        hoverColor='red'
      >
        <Delete />
      </ClassicIconButton>
    </Box>
  )
}

export default AdvanceButtonAction
