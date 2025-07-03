import { customNodeHierarchyStyles } from '../styles'
import { ClassicIconButton } from '@/lib'
import { Box } from '@mui/material'
import { Edit } from '@mui/icons-material'

const ContentNodeHierarchy = ({ data, setInfoDependency, editStructDependency }) => {
  return (
    <Box sx={customNodeHierarchyStyles.nodeHierarchyContent}>
      <Box sx={customNodeHierarchyStyles.containerNodeHierarchyLabel}>{data.label}</Box>
      <ClassicIconButton
        onClick={() => setInfoDependency(editStructDependency)}
        title='Editar'
        placement='bottom'
        type='button'
        sx={{ color: '#FFF' }}
      >
        <Edit />
      </ClassicIconButton>
    </Box>
  )
}

export default ContentNodeHierarchy
