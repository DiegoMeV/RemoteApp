import { ClassicIconButton } from '@/lib'
import { RemoveRedEye } from '@mui/icons-material'
import { Box } from '@mui/material'

const ItemBtnAlert = ({ handleOpenEditAlert, params }) => {
  return (
    <Box>
      <ClassicIconButton
        onClick={() => handleOpenEditAlert(params?.row?.alerta_id)}
        title={'Editar alerta'}
        placement={'bottom'}
        color={'secondary'}
      >
        <RemoveRedEye />
      </ClassicIconButton>
    </Box>
  )
}

export default ItemBtnAlert
