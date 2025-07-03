import { useHierarchyDependency } from '@/lib'
import { useStoreActions, useStoreState } from 'easy-peasy'
import toast from 'react-hot-toast'
import { useReactFlow } from 'reactflow'
import { createConnections, structureNodeDependency, updatedConnections, updatedDependencies } from './funcs'

const useDependenciesRequest = (handleSetOpen, id) => {
  const setStagesNEdges = useStoreActions((actions) => actions.infoFlowState.setStagesNEdges)
  const infoFlow = useStoreState((actions) => actions.infoFlowState.infoFlow)

  const { getNode } = useReactFlow()

  const onSuccessCreate = (response) => {
    const dependency = response.response
    handleSetOpen()

    const parentNode = getNode(id)
    const newDependencies = structureNodeDependency(dependency, parentNode)
    const newConnections = createConnections(dependency)

    setStagesNEdges({
      stages: [...infoFlow.stages, newDependencies],
      connections: [...infoFlow.connections, newConnections],
    })
    toast.success('Se creo la dependencia')
  }

  const onSuccessUpdate = (response) => {
    handleSetOpen()
    const dependency = response.data
    const nodeUpdated = updatedDependencies(infoFlow, dependency)
    const connectionsUpdate = updatedConnections(infoFlow, dependency)

    //TODO: Darle un position nuevo al node parent y al child, para orden jerarquico

    setStagesNEdges({
      stages: nodeUpdated,
      connections: connectionsUpdate,
    })
    toast.success('Se realizo el cambio')
  }

  const { mutateAsync: dependencyCre, isPending: loadingCre } = useHierarchyDependency({
    onSuccess: onSuccessCreate,
    onError: () => {
      toast.error('No se pudo crear la dependencia')
    },
  })

  const { mutateAsync: dependencyUpd, isPending: loadingUpd } = useHierarchyDependency({
    onSuccess: onSuccessUpdate,
    onError: () => {
      toast.error('No se pudo realizar el cambio')
    },
  })

  return {
    dependencyUpd,
    dependencyCre,
    isLoading: loadingCre || loadingUpd,
  }
}

export default useDependenciesRequest
