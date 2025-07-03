import { Position, NodeToolbar } from 'reactflow'
import { IconButton, Tooltip } from '@mui/material'

import { customNodeStyles } from '../styles'
import { DeleteForever, LibraryAdd } from '@mui/icons-material'
import { useEffect, useState } from 'react'

const StageNodeToolbar = ({ toolbarVisible, handleAddNodes, handleDeleteNode, disabledAdd }) => {
  const [disabled, setDisabled] = useState(disabledAdd)

  const handleClick = () => {
    setDisabled(true)
    handleAddNodes()
  }

  useEffect(() => {
    setDisabled(disabledAdd)
  }, [disabledAdd])

  return (
    <NodeToolbar
      isVisible={toolbarVisible}
      position={Position.Bottom}
      style={{
        borderRadius: '10px',
      }}
    >
      <Tooltip
        title='Agregar etapa'
        arrow
      >
        <IconButton
          disabled={disabled}
          onClick={handleClick}
          sx={customNodeStyles.toolTipBtn}
          color='primary'
        >
          <LibraryAdd />
        </IconButton>
      </Tooltip>
      <Tooltip
        title='Eliminar etapa'
        arrow
      >
        <IconButton
          disabled={disabled}
          onClick={handleDeleteNode}
          sx={customNodeStyles.toolTipBtn}
          color='primary'
        >
          <DeleteForever />
        </IconButton>
      </Tooltip>
    </NodeToolbar>
  )
}

export default StageNodeToolbar
