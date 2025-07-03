import { useEffect, useState } from 'react'
import { useReactFlow } from 'reactflow'
import { useStoreActions, useStoreState } from 'easy-peasy'
import toast from 'react-hot-toast'
import { MagicString, useCreateStage, useDeleteStage, useUpdateConnetions } from '@/lib'
import { childEdge, childNode } from './funcs'
import { structureConnection } from './funcsFlow'

const useCustomNodes = (id, data) => {
  const openSidebar = useStoreState((actions) => actions.reactFlowState.openSidebar)
  const stageSelected = useStoreState((actions) => actions.reactFlowState.stageSelected)
  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )

  const setStagesNEdges = useStoreActions((actions) => actions.infoFlowState.setStagesNEdges)
  const setStageSelected = useStoreActions((actions) => actions.reactFlowState.setStageSelected)
  const infoFlow = useStoreState((actions) => actions.infoFlowState.infoFlow)
  const variationParams = useStoreState((actions) => actions.reactFlowState.variationParams)

  const isFiscalBuilder = variationParams?.byActionTypes === 'fiscal'

  const [responseCreateStage, setResponseCreateStage] = useState({})

  const { setEdges, setNodes, getEdges, getNode, getNodes } = useReactFlow()

  const { mutateAsync: createStage } = useCreateStage({
    onSuccess: (response) => {
      const newNode = response.data
      setResponseCreateStage(newNode)
      updateConnectionsWithNewNode(newNode)
    },
    onError: () => {
      toast.error(MagicString.CONSTRUCTOR.FAILED_REQUEST_STAGES)
    },
  })

  const { mutateAsync: updateConnections, isPending: loadingUpdateConnections } =
    useUpdateConnetions({
      onSuccess: () => {
        const newNode = responseCreateStage
        const parentNode = getNode(id)

        const childNodes = childNode(parentNode, newNode, isFiscalBuilder)
        const childEdges = childEdge(parentNode, newNode)

        setNodes((nds) => nds.concat(childNodes))
        setEdges((edgs) => edgs.concat(childEdges))
        toast.success(MagicString.CONSTRUCTOR.SUCCESS_REQUEST_CREATE_STAGES)
      },
      onError: () => toast.error(`No se pudo crear la conexion`),
    })

  const { mutateAsync: updateConnectionsDelete, isPending: loadingConnectionsDelete } =
    useUpdateConnetions({
      onSuccess: (response) => {
        const newEdges =
          response?.data?.typeSpecs?.diagramConnections?.map(structureConnection) ?? []
        const nodesLives = infoFlow.stages.filter((stage) => stage.id !== id)
        setEdges(newEdges)
        setNodes(nodesLives)
        setStagesNEdges({
          stages: nodesLives,
          connections: newEdges,
        })
        setStageSelected({ id: '' })
        toast.success(`Se elimino la etapa: ${data.label}`)
      },
      onError: () => {
        toast.error(`No se pudo crear la conexion`)
      },
    })

  const [loading, setLoading] = useState(loadingUpdateConnections)

  const { mutateAsync: deleteStage } = useDeleteStage({
    onSuccess: () => filterNodeToDelete(),
    onError: (err) => {
      if (err?.response?.data?.error) {
        toast.error(err?.response?.data?.error)
        return
      }
      toast.error(`No se pudo eliminar la etapa: ${data.label}`)
    },
  })

  /**
   * Actualiza las conexiones con un nuevo nodo.
   * @param {Object} newNode - El nuevo nodo a conectar.
   */
  const updateConnectionsWithNewNode = (newNode) => {
    const newConnection = {
      source: id,
      target: newNode.id,
    }

    const reformerCurrentConnections = getEdges().map((edge) => {
      return {
        source: edge.source,
        target: edge.target,
      }
    })

    const body = {
      typeSpecs: {
        diagramConnections: [...reformerCurrentConnections, newConnection],
      },
    }

    updateConnections(body)
  }

  /**
   * Verifica y crea el body de la nueva etapa.
   */
  const handleAddNodes = () => {
    const parentNode = getNode(id)

    if (!parentNode) return

    const nodes = getNodes()

    const body = {
      name: 'Nueva etapa',
      description: '',
      isEnabled: true,
      position: nodes.length + 1,
      ...(isFiscalBuilder && { idOfficeExec: null }),
    }

    createStage(body)
  }

  /**
   * Filtra los nodos y conexiones que se van a eliminar.
   * @param {*} edges todas las conexiones.
   * @param {*} idEdgeTargetFromSource variable para reasignara la conexion que va a tener la etapa anterior
   * a la que se eliminara
   */
  const filterNodeToDelete = () => {
    const edges = getEdges()
    let idEdgeTargetFromSource

    edges.forEach((ed) => {
      if (ed.target === id) {
        idEdgeTargetFromSource = ed.source
      }
    })

    const newEdges = edges
      .filter((edg) => {
        return edg.target !== id
      })
      .map((edg) => {
        if (edg.source === id) {
          return { ...edg, source: idEdgeTargetFromSource }
        }
        return { ...edg }
      })

    const newConnections = newEdges.map((edge) => {
      return {
        source: edge.source,
        target: edge.target,
      }
    })

    updateConnectionsDelete({ typeSpecs: { diagramConnections: newConnections } })
  }

  const handleDeleteNode = () => {
    if (data.position === 1) {
      toast.error('No se puede eliminar la etapa inicial')
      return
    }

    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: 'Eliminar Etapa',
      content: `¿Esta seguro de eliminar la etapa ${data.label}?`,
      onConfirm: () => {
        deleteStage()
      },
    })
  }

  useEffect(() => {
    setLoading(loadingUpdateConnections)
  }, [loadingUpdateConnections])

  useEffect(() => {
    setLoading(loadingConnectionsDelete)
  }, [loadingConnectionsDelete])

  const stateVariables = {
    openSidebar,
    stageSelected,
    loading,
  }
  const stateFuntions = {
    handleDeleteNode,
    handleAddNodes,
  }

  return { stateVariables, stateFuntions }
}

export default useCustomNodes
