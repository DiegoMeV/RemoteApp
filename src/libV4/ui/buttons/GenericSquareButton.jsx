import { Button, CircularProgress, Tooltip, Typography } from '@mui/material'

const GenericSquareButton = ({ IconComponent, loading, textProps, ...props }) => {
  return (
    <Tooltip
      title={props.tooltip ?? ''}
      arrow
    >
      {props ? (
        <Button
          {...props}
          size={props.size ?? 'small'}
          variant={props.variant ?? 'contained'}
          className={props?.className}
        >
          {loading ? (
            <CircularProgress
              size={20}
              color='inherit'
            />
          ) : (
            <Typography
              whiteSpace='nowrap'
              textTransform='none'
              {...textProps}
            >
              {textProps?.label ?? ''}
            </Typography>
          )}
        </Button>
      ) : (
        <Button
          {...props}
          className={props.className}
        >
          {IconComponent ?? ''}
        </Button>
      )}
    </Tooltip>
  )
}

export default GenericSquareButton
