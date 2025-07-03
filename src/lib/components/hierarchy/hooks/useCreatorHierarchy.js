import { useStoreActions } from 'easy-peasy'
import { useReactFlow } from 'reactflow'

import { useHierarchyDependency } from '@/lib'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { structureNodeDependency } from './funcs'
import { fitViewSize } from '@/app/builder/[idProcessType]/hooks'

const useCreatorHierarchy = () => {
  const setStagesNEdges = useStoreActions((actions) => actions.infoFlowState.setStagesNEdges)

  const [loadingC, setLoadingC] = useState(false)

  const { setNodes, fitView } = useReactFlow()

  const { mutateAsync: dependencyCre, isPending: pendingCreation } = useHierarchyDependency({
    onSuccess: (response) => {
      const newNode = response.response
      const childNodes = structureNodeDependency(newNode, false, new Set())
      setNodes([childNodes])
      setStagesNEdges({
        stages: [childNodes],
        connections: [],
      })
      fitViewSize(fitView)
      toast.success(`Se creo la dependencia inicial`)
    },
    onError: () => {
      toast.error(`No se pudo crear la dependencia`)
    },
  })

  const handleCreate = () => {
    dependencyCre({
      name: 'Dependencia padre',
      isActive: true,
      parentId: null,
      idHierarchy: '',
      method: 'post',
    })
  }

  useEffect(() => {
    setLoadingC(pendingCreation)
  }, [pendingCreation])

  return { loadingC, handleCreate }
}

export default useCreatorHierarchy
