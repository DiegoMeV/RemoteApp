import { MagicString, useCreateStage, useUpdateConnetions } from '@/lib'
import { onErrorManagedMessage } from './funcs'
import { connectionSuccess, handleUpdateConnections, onSuccessDiagramConnections } from '../funcs'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useReactFlow } from 'reactflow'

const useReqOnConnection = ({
  newNodeCreated,
  currentEgdes,
  setNewNodeCreated,
  setCurrentEdges,
} = {}) => {
  const infoFlow = useStoreState((actions) => actions.infoFlowState.infoFlow)
  const setStagesNEdges = useStoreActions((actions) => actions.infoFlowState.setStagesNEdges)
  const idCurrentEdgeConnection = useStoreState(
    (actions) => actions.reactFlowState.idCurrentEdgeConnection
  )

  const setEgdeMenuClose = useStoreActions((actions) => actions.reactFlowState.setEgdeMenuClose)

  const { setEdges, setNodes, getNode, getEdge, getEdges } = useReactFlow()

  const { mutateAsync: createStage } = useCreateStage({
    onSuccess: (response) => {
      const newNode = response.data
      setNewNodeCreated(newNode)
      handleUpdateConnections({
        id: idCurrentEdgeConnection,
        newNode,
        getEdge,
        setCurrentEdges,
        getEdges,
        updateConnections,
      })
    },
    onError: (err) =>
      onErrorManagedMessage({ err, message: MagicString.CONSTRUCTOR.FAILED_REQUEST_STAGES }),
  })

  const { mutateAsync: updateConnections, isPending: loading } = useUpdateConnetions({
    onSuccess: () => {
      setEgdeMenuClose()
      connectionSuccess({
        id: idCurrentEdgeConnection,
        newNodeCreated,
        getEdge,
        getNode,
        currentEgdes,
        setEdges,
        setNodes,
      })
    },
    onError: (err) =>
      onErrorManagedMessage({ err, message: MagicString.CONSTRUCTOR.CANNOT_UPDATE_CONNECTION }),
  })

  const { mutateAsync: requestUpdateConnection, isPending: loadConnection } = useUpdateConnetions({
    onSuccess: (response) => {
      setEgdeMenuClose()
      onSuccessDiagramConnections({
        response,
        setEdges,
        setStages: setStagesNEdges,
        stages: infoFlow?.stages ?? [],
        message: MagicString.CONSTRUCTOR.SUCCESS_DELETED_CONNECTIONS,
      })
    },
    onError: (err) =>
      onErrorManagedMessage({ err, message: MagicString.CONSTRUCTOR.FAILED_REQUEST_CONNECTIONS }),
  })

  return {
    createStage,
    requestUpdateConnection,
    loading: loading || loadConnection,
  }
}

export default useReqOnConnection
