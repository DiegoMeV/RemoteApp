import { memo } from 'react'
import { getSmoothStepPath } from 'reactflow'

import { useEdgeClick } from '../hooks'
import { EdgeTypesStyles, customNodeStyles } from '../styles'
import { MoreVert } from '@mui/icons-material'

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style,
  markerEnd,
}) => {
  const [edgePath, edgeCenterX, edgeCenterY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })
  const { translate, orientation, handleSetMenu, isColored } = useEdgeClick(
    id,
    targetX,
    targetY,
    edgeCenterX,
    edgeCenterY
  )

  return (
    <>
      <path
        id={id}
        style={style}
        className={!isColored ? EdgeTypesStyles.edgePath : EdgeTypesStyles.edgePathShadow}
        d={edgePath}
        markerEnd={markerEnd}
      />
      <g transform={translate}>
        <foreignObject
          width='20'
          height='20'
          x={orientation === 'horizontal' ? -10 : 25}
          y={orientation === 'horizontal' ? -10 : -30}
          style={{
            overflow: 'visible',
            backgroundColor: 'white',
            borderRadius: '5px',
            border: '0.5px solid #DEDEDE',
          }}
        >
          <div style={{ display: 'block', position: 'relative' }}>
            <div
              width={20}
              height={20}
              className={EdgeTypesStyles.edgeButton}
            />
            <MoreVert
              id={`${id}-tag-div`}
              onClick={handleSetMenu}
              sx={customNodeStyles.moreVertIconStyles}
            />
          </div>
        </foreignObject>
      </g>
    </>
  )
}

export default memo(CustomEdge)
