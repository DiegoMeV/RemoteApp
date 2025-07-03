import ReactFlow, { Controls, Background, Panel, useReactFlow, ConnectionLineType } from 'reactflow'
import { useStoreActions, useStoreState } from 'easy-peasy'
import 'reactflow/dist/style.css'

import { Box } from '@mui/material'

import { AdvancedOptionsConstructor, MenuEdgeActions, edgeTypes, nodeTypes } from '.'

import { onErrorManagedMessage, useDynamicShape, useLayout } from '../hooks'
import { BackdropLoading, MagicString, useUpdateConnetions } from '@/lib'
import { onConnect, onSuccessDiagramConnections } from '../funcs'

const proOptions = { account: 'paid-pro', hideAttribution: true }

const fitViewOptions = {
  padding: 0.95,
}

const FlowStructure = () => {
  const infoFlow = useStoreState((actions) => actions.infoFlowState.infoFlow)
  const setStagesNEdges = useStoreActions((actions) => actions.infoFlowState.setStagesNEdges)

  const edgeMenuActions = useStoreState((actions) => actions.reactFlowState.edgeMenuActions)
  const open = Boolean(edgeMenuActions)

  useLayout()

  const { bgColor, defaultEdgeOptions } = useDynamicShape()

  const { setEdges, getEdges } = useReactFlow()

  const { mutateAsync: requestUpdateConnection, isPending: loading } = useUpdateConnetions({
    onSuccess: (response) => {
      onSuccessDiagramConnections({
        response,
        setEdges,
        setStages: setStagesNEdges,
        stages: infoFlow?.stages ?? [],
        message: MagicString.CONSTRUCTOR.SUCCESS_REQUEST_CONNECTIONS,
      })
    },
    onError: (err) =>
      onErrorManagedMessage({ err, message: MagicString.CONSTRUCTOR.FAILED_REQUEST_CONNECTIONS }),
  })

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      {loading && <BackdropLoading loading={loading} />}
      {open && (
        <MenuEdgeActions
          edgeMenuActions={edgeMenuActions}
          open={open}
        />
      )}
      <ReactFlow
        defaultNodes={infoFlow?.stages}
        defaultEdges={infoFlow?.connections}
        proOptions={proOptions}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitViewOptions={fitViewOptions}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        style={{ background: bgColor }}
        minZoom={0.2}
        nodesDraggable={false}
        nodesConnectable={true}
        zoomOnDoubleClick={false}
        attributionPosition='bottom-left'
        deleteKeyCode={null}
        onConnect={(connection) =>
          onConnect({
            connection,
            setEdges,
            getEdges,
            reqUpdateConnection: requestUpdateConnection,
            infoFlow,
          })
        }
        connectionLineType={ConnectionLineType.SmoothStep}
      >
        <Panel position='top-left'>
          <AdvancedOptionsConstructor />
        </Panel>

        <Controls showInteractive={false} />
        <Background
          variant='dots'
          gap={10}
          size={1}
        />
      </ReactFlow>
    </Box>
  )
}

/**
 * TODO:
 * Verificar porque no funciona correctamente el:
 * export default React.memo(FlowsStructure)
 */
export default FlowStructure
