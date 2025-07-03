import ReactFlow, { Controls, Background } from 'reactflow'


import CustomNodeHierarchy from './CustomNodeHierarchy'
import CustomCreateHierarchy from './CustomCreateHierarchy'
import { useDynamicShape } from '@/app/builder/[idProcessType]/hooks'

const nodeTypes = {
  stageHierarchy: CustomNodeHierarchy,
  nodeCreator: CustomCreateHierarchy
}

const proOptions = { account: 'paid-pro', hideAttribution: true }

const ReactFlowStructure = ({ nodes, edges }) => {
  const { bgColor, defaultEdgeOptions } = useDynamicShape('smoothstep')

  return (
    <ReactFlow
      defaultNodes={nodes ?? []}
      defaultEdges={edges ?? []}
      proOptions={proOptions}
      nodeTypes={nodeTypes}
      fitViewOptions={{
        padding: 0.95,
      }}
      defaultEdgeOptions={defaultEdgeOptions}
      fitView
      style={{ background: bgColor }}
      minZoom={0.2}
      nodesDraggable={false}
      nodesConnectable={false}
      zoomOnDoubleClick={false}
      attributionPosition='bottom-left'
      deleteKeyCode={null}
    >
      <Controls showInteractive={false} />
      <Background
        variant='dots'
        gap={10}
        size={0}
      />
    </ReactFlow>
  )
}

export default ReactFlowStructure
