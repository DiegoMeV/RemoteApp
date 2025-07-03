import { ClassicIconButton } from '@/lib'
import { Add } from '@mui/icons-material'
import { NodeToolbar, Position } from 'reactflow'
import { customNodeHierarchyStyles } from '../styles'

const NodeToolbarHierarchy = ({ data, setInfoDependency, creationStructDependency }) => {
  return (
    <NodeToolbar
      toolbarVisible={data.toolbarVisible}
      position={Position.Bottom}
      style={{
        borderRadius: '10px',
      }}
    >
      <ClassicIconButton
        onClick={() => setInfoDependency(creationStructDependency)}
        title='Agregar'
        placement='bottom'
        type='button'
        sx={customNodeHierarchyStyles.toolTipBtnOutside}
        color='primary'
      >
        <Add />
      </ClassicIconButton>
    </NodeToolbar>
  )
}

export default NodeToolbarHierarchy
