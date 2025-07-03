import { Backdrop, Box, CircularProgress } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import { customNodeStyles } from '../styles'
import { ClassicIconButton } from '@/lib'
import { useCreatorStageNode } from '../hooks'

const CreatorStageNode = ({ id }) => {
  const { loadingC, handleCreate } = useCreatorStageNode(id)

  return (
    <Box
      sx={{
        ...customNodeStyles.addNodeButtonContainer,
      }}
    >
      <Backdrop open={loadingC}>
        <CircularProgress color='inherit' />
      </Backdrop>
      <Box sx={customNodeStyles.addNodeButton}>
        <ClassicIconButton
          disabled={loadingC ?? false}
          onClick={handleCreate}
          title='Crear etapa inicial'
          placement='bottom'
          hoverColor='gray'
        >
          <AddIcon />
        </ClassicIconButton>
      </Box>
    </Box>
  )
}

export default CreatorStageNode
