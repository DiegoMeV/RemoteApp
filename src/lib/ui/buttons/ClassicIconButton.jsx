import { IconButton, Tooltip } from '@mui/material'
import { sxHoverColor } from './styles/sxFunctions'

const ClassicIconButton = ({
  children,
  onClick,
  title,
  placement,
  color,
  hoverColor,
  disabled,
  sx,
  type,
}) => {
  return (
    <Tooltip
      arrow
      type={type}
      placement={placement ?? 'top'}
      title={title ?? ''}
    >
      <span>
        <IconButton
          type={type}
          color={color ?? 'primary'}
          disabled={disabled ?? false}
          onClick={onClick}
          sx={{ ...sxHoverColor(hoverColor), ...sx }}
        >
          {children}
        </IconButton>
      </span>
    </Tooltip>
  )
}
export default ClassicIconButton
