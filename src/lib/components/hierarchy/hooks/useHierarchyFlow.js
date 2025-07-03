import { toArray, useSearchHierarchy } from '@/lib'
import { useEffect, useState } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'
import {
  changeOrientation,
  configConnections,
  createBtnDependencyNode,
  extractParentId,
  structureNodeDependency,
} from './funcs'

const useHierarchyFlow = () => {
  const setStagesNEdges = useStoreActions((actions) => actions.infoFlowState.setStagesNEdges)
  const clearInfoFlowState = useStoreActions((actions) => actions.infoFlowState.clearInfoFlowState)
  const clearReactFlowState = useStoreActions((state) => state.reactFlowState.clearReactFlowState)
  const orientation = useStoreState((actions) => actions.stateOrientation.orientation)
  const setOrientation = useStoreActions((actions) => actions.stateOrientation.setOrientation)

  const { data: hierarchy, isLoading: loadingHierarchy } = useSearchHierarchy({
    qry: '?rowsPerPage=100&isActive=true',
  })

  const [dataNodes, setDataNodes] = useState([])
  const [dataConnections, setDataConnections] = useState([])

  const convertInformation = () => {
    const hierarchyArr = toArray(hierarchy?.data)
    const parentIdArr = extractParentId(hierarchyArr)

    const filterNodes = hierarchyArr?.map((node) => structureNodeDependency(node, '', parentIdArr))

    const connections = []

    hierarchyArr?.forEach((node) => configConnections(connections, node))
    setDataNodes(filterNodes ?? [])
    setDataConnections(connections ?? [])

    setStagesNEdges({
      stages: filterNodes || [],
      connections: connections || [],
    })

    changeOrientation(orientation, setOrientation)
  }

  useEffect(() => {
    if (hierarchy !== undefined) {
      convertInformation()
    }

    return () => {
      clearReactFlowState()
      clearInfoFlowState()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hierarchy])

  useEffect(() => {
    if (hierarchy?.data?.length === 0) {
      createBtnDependencyNode(setStagesNEdges)
      return
    }
  }, [hierarchy, setStagesNEdges])

  useEffect(() => {
    return () => {
      changeOrientation(orientation, setOrientation)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeOrientation])

  return {
    dataNodes,
    dataConnections,
    loadingHierarchy,
    hierarchy,
  }
}

export default useHierarchyFlow
