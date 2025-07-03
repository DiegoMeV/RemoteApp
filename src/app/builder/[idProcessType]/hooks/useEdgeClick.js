import { useStoreActions, useStoreState } from 'easy-peasy'
import { useMemo } from 'react'
import { useReactFlow } from 'reactflow'

const useEdgeClick = (id, targetX, targetY, edgeCenterX, edgeCenterY) => {
  const orientation = useStoreState((actions) => actions.stateOrientation.orientation)
  const setEgdeMenuOpen = useStoreActions((actions) => actions.reactFlowState.setEgdeMenuOpen)
  const setIdCurrentEdgeConnection = useStoreActions(
    (actions) => actions.reactFlowState.setIdCurrentEdgeConnection
  )
  
  const stageSelected = useStoreState((actions) => actions.reactFlowState.stageSelected)
  const { getEdge } = useReactFlow()

  const translate = useMemo(() => {
    const currentOrderOrientation = orientation === 'horizontal'

    return currentOrderOrientation
      ? `translate(${edgeCenterX}, ${edgeCenterY})`
      : `translate(${edgeCenterX - 35}, ${edgeCenterY + 20})`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edgeCenterX, edgeCenterY, targetX, targetY, orientation])

  const handleSetMenu = (ev) => {
    setEgdeMenuOpen(ev.target.id)
    setIdCurrentEdgeConnection(id)
  }

  const isColored = useMemo(() => {
    const edge = getEdge(id)
    return edge.source === stageSelected.id
  }, [id, stageSelected, getEdge])

  return { translate, orientation, handleSetMenu, isColored }
}

export default useEdgeClick
