import { MagicString } from '@/lib'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useState } from 'react'
import { useReactFlow } from 'reactflow'
import { handleDeleteEdge, handleEdgeClick } from '../funcs'
import { HighlightOffOutlined, SchemaOutlined } from '@mui/icons-material'
import useReqOnConnection from './useReqOnConnection'

const useMenuEdge = () => {
  const idCurrentEdgeConnection = useStoreState(
    (actions) => actions.reactFlowState.idCurrentEdgeConnection
  )

  const setEgdeMenuClose = useStoreActions((actions) => actions.reactFlowState.setEgdeMenuClose)

  const { getNode, getEdge, getEdges, getNodes } = useReactFlow()

  const [newNodeCreated, setNewNodeCreated] = useState({})
  const [currentEgdes, setCurrentEdges] = useState({
    sourceEdge: {},
    targetEdge: {},
  })

  const { createStage, requestUpdateConnection, loading } = useReqOnConnection({
    newNodeCreated,
    currentEgdes,
    setNewNodeCreated,
    setCurrentEdges,
  })

  const menuListOptions = [
    {
      label: MagicString.CONSTRUCTOR.ADD_INTERMEDIATE_STAGE_LABEL,
      icon: <SchemaOutlined />,
      handleEvent: () =>
        handleEdgeClick({ id: idCurrentEdgeConnection, getEdge, getNodes, getNode, createStage }),
    },
    {
      label: MagicString.CONSTRUCTOR.DELETE_CONNECTION_LABEL,
      icon: <HighlightOffOutlined />,
      handleEvent: () =>
        handleDeleteEdge({
          id: idCurrentEdgeConnection,
          getEdges,
          reqUpdateConnection: requestUpdateConnection,
        }),
    },
  ]

  const states = { menuListOptions, loading }

  const stateFunction = { setEgdeMenuClose }

  return [states, stateFunction]
}

export default useMenuEdge
