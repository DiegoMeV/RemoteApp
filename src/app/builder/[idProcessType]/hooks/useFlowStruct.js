import { useCallback, useEffect, useState } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useStagesInfo } from '@/lib'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { createBtnStageNode, structureConnection, structureStageNode } from './funcsFlow'

const useFlowStruct = ({ infoTypeProcess, isSuccess }) => {
  const variationParams = useStoreState((actions) => actions.reactFlowState.variationParams)

  const clearInfoFlowState = useStoreActions((actions) => actions.infoFlowState.clearInfoFlowState)
  const clearReactFlowState = useStoreActions((state) => state.reactFlowState.clearReactFlowState)
  const setStagesNEdges = useStoreActions((actions) => actions.infoFlowState.setStagesNEdges)

  // TODO:
  //refetch,
  const {
    data: infoStages,
    isLoading: loadingStages,
    isError: errorInStage,
  } = useStagesInfo({ infoTypeProcess, isSuccess })

  // TODO:
  // const { mutateAsync: createConnections } = useUpdateConnetions({
  //   onSuccess: refetch,
  //   onError: (e) => {
  //     toast.error(e?.response?.data?.error ?? `No se pudo crear la conexion`)
  //   },
  // })

  const convertInformation = useCallback(() => {
    const isFiscalBuilder = variationParams?.byActionTypes === 'fiscal'

    const filterStages = infoStages?.data?.map((stage) =>
      structureStageNode({ stage, isFiscalBuilder })
    )

    const typeProcessInfo = infoTypeProcess?.data[0]
    const connections =
      typeProcessInfo?.typeSpecs?.diagramConnections?.map(structureConnection) ?? []

    // TODO:
    // const connectionFix = validateIsConnection(filterStages, connections, createConnections)
    // const connectionsExists = validateIdExists(filterStages, connectionFix)

    setStagesNEdges({
      stages: filterStages ?? [],
      connections: connections ?? [],
    })
  }, [infoStages, infoTypeProcess, setStagesNEdges, variationParams])

  useEffect(() => {
    return () => {
      clearReactFlowState()
      clearInfoFlowState()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!infoTypeProcess?.success && !infoStages?.success) return

    if (infoStages?.data?.length === 0) {
      createBtnStageNode(setStagesNEdges)
      return
    }
    convertInformation()
  }, [infoStages, infoTypeProcess, convertInformation, setStagesNEdges])

  // logica botón sidebar
  const [showCloseBtn, setShowCloseBtn] = useState(false)
  const theme = useTheme()
  const mdMatch = useMediaQuery(theme.breakpoints.down('md'))
  useEffect(() => {
    setShowCloseBtn(mdMatch)
  }, [mdMatch])

  return {
    loadingStages,
    errorInStage,
    showCloseBtn,
  }
}

export default useFlowStruct
