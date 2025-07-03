import { ReactFlowProvider } from 'reactflow'

import 'reactflow/dist/style.css'
import { Loading } from '@/lib'
import { useHierarchyFlow } from '../hooks'
import { ReactFlowStructure } from '.'
import { Box } from '@mui/material'
import { customNodeHierarchyStyles } from '../styles'
import { useLayout } from '@/app/builder/[idProcessType]/hooks'

const FlowHierarchyStruct = () => {
  // Custom hook for fetching hierarchy data
  const { dataNodes, dataConnections, loadingHierarchy, hierarchy } = useHierarchyFlow()

  // Custom hook for managing layout
  useLayout()

  return (
    <Box sx={customNodeHierarchyStyles.hierarchyContainer}>
      {loadingHierarchy ? (
        <Loading />
      ) : hierarchy ? (
        <ReactFlowStructure
          nodes={dataNodes}
          edges={dataConnections}
        />
      ) : null}
    </Box>
  )
}

const HierarchyFlow = (props) => {
  return (
    <ReactFlowProvider>
      <FlowHierarchyStruct {...props} />
    </ReactFlowProvider>
  )
}

export default HierarchyFlow
