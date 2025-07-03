import { useStoreActions } from 'easy-peasy'
import { useReactFlow } from 'reactflow'

import { useCreateStage } from '@/lib'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { childNode, fitViewSize } from '../hooks'

const useCreatorStageNode = () => {
  const setStagesNEdges = useStoreActions((actions) => actions.infoFlowState.setStagesNEdges)

  const [loadingC, setLoadingC] = useState(false)

  const { setNodes, fitView } = useReactFlow()

  const { mutateAsync: createStage, isPending: pendingCreation } = useCreateStage({
    onSuccess: (response) => {
      const newNode = response.data
      const childNodes = childNode(false, newNode)
      setNodes([childNodes])
      setStagesNEdges({
        stages: [childNodes],
        connections: [],
      })
      fitViewSize(fitView)
      toast.success(`Se creo la etapa inicial`)
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? `No se pudo crear la etapa`)
    },
  })

  const handleCreate = () => {
    createStage({
      name: 'Etapa inicial',
      description: '',
      isEnabled: true,
      position: 1,
    })
  }

  useEffect(() => {
    setLoadingC(pendingCreation)
  }, [pendingCreation])

  return { loadingC, handleCreate }
}

export default useCreatorStageNode
