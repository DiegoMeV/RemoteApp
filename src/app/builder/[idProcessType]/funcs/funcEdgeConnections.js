import { MagicString } from '@/lib'
import toast from 'react-hot-toast'
import { structureConnection } from '../hooks'

//TODO: Documentar
const structureEgdes = (edge) => ({
  source: edge?.source ?? '',
  target: edge?.target ?? '',
})

const nodeStruct = (nodes) => ({
  name: MagicString.CONSTRUCTOR.NEW_STAGE_TEXT,
  description: '',
  isEnabled: true,
  position: nodes?.length + 1,
})

const createNewStageNode = ({ nodeId, targetNode } = {}) => ({
  id: nodeId,
  position: { ...targetNode.position },
  data: { label: MagicString.CONSTRUCTOR.NEW_STAGE_TEXT, description: '', isEnabled: true },
  type: 'stageNode',
})

const createEdgesForNewNode = ({ edge, newNodeId } = {}) => [
  {
    id: `${edge.source}->${newNodeId}`,
    source: edge.source,
    target: newNodeId,
    type: 'addNewStage',
  },
  {
    id: `${newNodeId}->${edge.target}`,
    source: newNodeId,
    target: edge.target,
    type: 'addNewStage',
  },
]

const connectionRequestInternal = ({ edges, reqUpdateConnection } = {}) => {
  const reformerConnections = edges?.map(structureEgdes)

  const body = {
    typeSpecs: {
      diagramConnections: [...reformerConnections],
    },
  }

  reqUpdateConnection(body)
}

const updateGraph = ({ id, newNode, edge, params } = {}) => {
  const { currentEgdes, setEdges, setNodes } = params
  const { sourceEdge, targetEdge } = currentEgdes

  setEdges((edges) => edges.filter((e) => e.id !== id).concat([sourceEdge, targetEdge]))
  setNodes((nodes) => {
    const targetNodeIndex = nodes.findIndex((node) => node.id === edge.target)
    return [...nodes.slice(0, targetNodeIndex), newNode, ...nodes.slice(targetNodeIndex)]
  })
}

const updateConnection = ({ sourceEdge, targetEdge, getEdges, id } = {}) => {
  const edges = getEdges()
  return edges.filter((e) => e.id !== id).concat([sourceEdge, targetEdge])
}

export const onConnect = ({
  connection,
  setEdges,
  getEdges,
  reqUpdateConnection,
  infoFlow,
} = {}) => {
  const { source, target } = connection || {}

  if (source === target) {
    setEdges(infoFlow?.connections || [])
    toast.error(MagicString.CONSTRUCTOR.CONNECTION_STAGES_DENIED)
    return
  }

  const edges = getEdges()

  connectionRequestInternal({ edges, reqUpdateConnection })
}

export const onSuccessDiagramConnections = ({
  response,
  setEdges,
  setStages,
  stages,
  message,
} = {}) => {
  const connections = response?.data?.typeSpecs?.diagramConnections?.map(structureConnection) ?? []

  setEdges(connections)
  setStages({
    stages,
    connections,
  })
  toast.success(message)
}

export const handleEdgeClick = ({ id, getEdge, getNodes, getNode, createStage } = {}) => {
  const edge = getEdge(id)
  if (!edge) return

  const nodes = getNodes()

  const targetNode = getNode(edge.target)
  if (!targetNode) return

  const body = nodeStruct(nodes)

  createStage(body)
}

export const handleDeleteEdge = ({ id, getEdges, reqUpdateConnection } = {}) => {
  const edges = getEdges()
  const edgeIndex = edges.findIndex((connection) => connection.id === id)

  if (edgeIndex === -1) return

  const edge = edges[edgeIndex]
  const countEdgesByTarget = edges.filter((cox) => cox.target === edge.target)

  if (countEdgesByTarget.length <= 1) {
    toast.error(MagicString.CONSTRUCTOR.CANNOT_DELETE_CURRENT_EDGE)
    return
  }

  edges.splice(edgeIndex, 1)

  connectionRequestInternal({ edges, reqUpdateConnection })
}

export const handleUpdateConnections = ({
  id,
  newNode,
  getEdge,
  setCurrentEdges,
  getEdges,
  updateConnections,
} = {}) => {
  const edge = getEdge(id)
  if (!edge) return

  const [sourceEdge, targetEdge] = createEdgesForNewNode({ edge, newNodeId: newNode.id })

  setCurrentEdges({
    sourceEdge: sourceEdge,
    targetEdge: targetEdge,
  })

  const diagramConnections = updateConnection({ sourceEdge, targetEdge, getEdges, id })

  connectionRequestInternal({ edges: diagramConnections, reqUpdateConnection: updateConnections })
}

export const connectionSuccess = ({ id, newNodeCreated, getEdge, getNode, ...params } = {}) => {
  const newNode = newNodeCreated

  const edge = getEdge(id)
  if (!edge) return

  const targetNode = getNode(edge.target)
  if (!targetNode) return

  const newStageNode = createNewStageNode({ nodeId: newNode.id, targetNode })

  updateGraph({
    id,
    newNode: newStageNode,
    edge,
    params,
  })

  toast.success(MagicString.CONSTRUCTOR.SUCCESS_REQUEST_CREATE_STAGES)
}
