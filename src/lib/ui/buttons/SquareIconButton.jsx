import { Button, Tooltip } from '@mui/material'
import styles from './styles/buttons.module.css'

const SquareIconButton = ({
  IconComponent,
  tooltip,
  text,
  variant,
  positionIcon,
  color,
  onClick = () => {},
  sx,
  size,
  disabled,
  type,
}) => {
  return (
    <Tooltip
      title={tooltip ?? ''}
      arrow
    >
      {text ? (
        <Button
          fullWidth
          type={type}
          disabled={disabled}
          variant={variant ?? 'contained'}
          size={size ?? 'small'}
          startIcon={positionIcon === 'end' ? null : IconComponent}
          endIcon={positionIcon === 'end' ? IconComponent : null}
          color={color ?? 'primary'}
          onClick={onClick}
          className={styles.iconHeight}
          sx={sx}
        >
          {text ?? ''}
        </Button>
      ) : (
        <Button
          fullWidth
          variant={variant ?? 'contained'}
          onClick={onClick}
          disabled={disabled}
          className={styles.iconHeight}
          sx={sx}
        >
          {IconComponent}
        </Button>
      )}
    </Tooltip>
  )
}

export default SquareIconButton
