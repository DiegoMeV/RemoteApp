import { Handle, Position } from 'reactflow'
import { useCustomNodes, useNodeDetails } from '../hooks'

import { Backdrop, Box, CircularProgress, IconButton, Tooltip } from '@mui/material'

import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined'
import { StageNodeToolbar } from '.'
import { customNodeStyles } from '../styles'
import { memo } from 'react'

const CustomStageNode = ({ id, data, sourcePosition, targetPosition }) => {
  const { stateVariables, stateFuntions } = useCustomNodes(id, data)
  const { stageSelected, loading } = stateVariables
  const { handleDeleteNode, handleAddNodes } = stateFuntions

  const { handleSidebarOpen, handleSetStage, colorNode } = useNodeDetails(id)

  return (
    <Box
      onClick={() => {
        if (stageSelected.id !== id) {
          handleSetStage()
        }
      }}
      sx={{
        ...colorNode,
        ...customNodeStyles.customNodeContainer,
      }}
      title={data?.label ?? ''}
    >
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
      <Handle
        type='target'
        position={targetPosition || Position.Top}
        style={{ background: '#1E88E5', visibility: data.position !== 1 ? 'visible' : 'hidden' }}
        isConnectable={data.position !== 1}
      />
      <Box sx={customNodeStyles.containerCustomBtn}>
        <Box sx={{ pl: '10px', ...customNodeStyles?.titleNodeStage }}>{data.label}</Box>
        <Tooltip
          title='Detalles'
          arrow
        >
          <IconButton
            onClick={handleSidebarOpen}
            sx={{
              color: '#FFF',
            }}
          >
            <OpenInNewOutlinedIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <StageNodeToolbar
        toolbarVisible={data.toolbarVisible}
        handleAddNodes={handleAddNodes}
        handleDeleteNode={handleDeleteNode}
        disabledAdd={loading}
      />
      <Handle
        type='source'
        position={sourcePosition || Position.Bottom}
        style={{ background: '#1E88E5' }}
      />
    </Box>
  )
}

export default memo(CustomStageNode)
