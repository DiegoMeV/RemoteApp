import { useLayoutEffect, useState } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useReactFlow } from 'reactflow'
import toast from 'react-hot-toast'
import { extractIds } from './funcsFlow'

const useNodeDetails = (id) => {
  const setOpenSidebar = useStoreActions((actions) => actions.reactFlowState.setOpenSidebar)
  const setStageSelected = useStoreActions((actions) => actions.reactFlowState.setStageSelected)

  const stageSelected = useStoreState((actions) => actions.reactFlowState.stageSelected)
  const infoFlow = useStoreState((actions) => actions.infoFlowState.infoFlow)

  const [colorNode, setColorNode] = useState({})

  const { getNode } = useReactFlow()

  /**
   * Funcion para verificar si lo que se selecciono fue una etapa
   */
  const handleSetStage = () => {
    const nodeSelected = getNode(id)

    if (!nodeSelected) {
      toast.error('La etapa que se escogio no existe')
      return
    }
    setStageSelected({
      id: nodeSelected.id,
    })
  }

  const handleSidebarOpen = () => {
    handleSetStage()
    setOpenSidebar(true)
  }

  const getIsColored = (id, infoFlow) => {
    const connectionFilter = infoFlow.connections.filter((connection) => {
      return connection.source === id || connection.target === id
    })

    const connectionSources = extractIds(connectionFilter, 'source')

    return connectionSources.has(stageSelected.id)
  }

  useLayoutEffect(() => {
    const obj = {
      WebkitBoxShadow: '0px 0px 11px 2px rgba(26, 115, 232, 1)',
      MozBoxShadow: '0px 0px 11px 2px rgba(26, 115, 232, 1)',
      boxShadow: '0px 0px 11px 2px rgba(26, 115, 232, 1)',
    }

    const isColored = getIsColored(id, infoFlow)

    setColorNode(stageSelected.id === id || isColored ? obj : {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageSelected, id, infoFlow])

  return {
    handleSidebarOpen,
    handleSetStage,
    colorNode,
  }
}

export default useNodeDetails
