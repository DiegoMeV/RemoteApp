import { Circle } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import { colorInfo, tooltipState } from '../funcs'

const CircleStatus = ({ status, remainingDays }) => {
  const tooltip = tooltipState(remainingDays)
  const color = colorInfo(status)
  return (
    <Tooltip title={tooltip}>
      <Circle sx={{ color: color }} />
    </Tooltip>
  )
}

export default CircleStatus
