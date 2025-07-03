import { useEffect, useRef, useState } from 'react'
import { useReactFlow, useStore } from 'reactflow'
import { timer } from 'd3-timer'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { layoutNodes, updateNodesFinalState, updateNodesIntermediateState } from './funcs'

const nodeCountSelector = (state) => state.nodeInternals.size

const options = { duration: 300 }

export const useLayout = () => {
  const initial = useRef(true)
  const nodeCount = useStore(nodeCountSelector)
  const { getNodes, getNode, setNodes, setEdges, getEdges, fitView } = useReactFlow()

  const setStagesNEdges = useStoreActions((actions) => actions.infoFlowState.setStagesNEdges)
  const setStageSelected = useStoreActions((actions) => actions.reactFlowState.setStageSelected)
  const stageSelected = useStoreState((actions) => actions.reactFlowState.stageSelected)
  const infoFlow = useStoreState((actions) => actions.infoFlowState.infoFlow)
  const orientation = useStoreState((actions) => actions.stateOrientation.orientation)
  const [direction, setDirection] = useState('LR')

  useEffect(() => {

    const nodes = getNodes()
    const edges = getEdges()

    if (nodes.length === 0 || edges.length === 0) {
      return
    }

    const targetNodes = layoutNodes(nodes, edges, orientation, setDirection)
    const nodeSelectedExist = getNode(stageSelected.id)

    if (!nodeSelectedExist) {
      setStageSelected({ id: '' })
    }

    const transitions = targetNodes.map((node) => {
      return {
        id: node.id,
        from: getNode(node.id)?.position || node.position,
        to: node.position,
        node,
      }
    })

    const t = timer((elapsed) => {
      updateNodesIntermediateState(transitions, elapsed, direction, setNodes)

      if (elapsed > options.duration) {
        updateNodesFinalState(transitions, edges, direction, setNodes, setStagesNEdges)

        t.stop()
        
        if (!initial.current) {
          fitView({ duration: 200, padding: 0.2 })
        }
        initial.current = false
      }
    })

    return () => {
      t.stop()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeCount, fitView, orientation, direction, getEdges, getNodes])

  useEffect(() => {
    setNodes(infoFlow.stages ?? [])
    setEdges(infoFlow.connections ?? [])
    fitView({ duration: 200, padding: 0.2 })
  }, [infoFlow, setNodes, setEdges, fitView])
}

export default useLayout
