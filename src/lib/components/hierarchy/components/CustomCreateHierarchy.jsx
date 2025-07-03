import { Backdrop, Box, CircularProgress } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import { customNodeHierarchyStyles } from '../styles'
import { ClassicIconButton } from '@/lib'
import { useCreatorHierarchy } from '../hooks'

const CustomCreateHierarchy = ({ id }) => {
  const { loadingC, handleCreate } = useCreatorHierarchy(id)

  return (
    <Box sx={customNodeHierarchyStyles.addNodeButtonContainer}>
      <Backdrop open={loadingC}>
        <CircularProgress color='inherit' />
      </Backdrop>
      <Box sx={customNodeHierarchyStyles.addNodeButton}>
        <ClassicIconButton
          disabled={loadingC ?? false}
          onClick={handleCreate}
          title='Crear dependencia inicial'
          placement='bottom'
          hoverColor='gray'
        >
          <AddIcon />
        </ClassicIconButton>
      </Box>
    </Box>
  )
}

export default CustomCreateHierarchy
