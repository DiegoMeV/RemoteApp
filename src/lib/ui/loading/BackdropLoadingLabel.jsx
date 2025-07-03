import { Backdrop, Box, CircularProgress, Typography } from '@mui/material'

const BackdropLoadingLabel = ({
  value = 0,
  open = true,
  trackColor = '#e0e0e0',
  label,
  ...props
}) => {
  return (
    <Backdrop
      open={open}
      sx={{ color: '#fff', zIndex: 2000, display: 'flex', flexDirection: 'column' }}
    >
      <Typography
        variant='caption'
        component='div'
        sx={{ color: '#ffff', fontSize: '1.5rem' }}
      >
        {label}
      </Typography>
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress
          variant='determinate'
          size={120}
          value={value}
          sx={{
            color: props.color || '#1976d2',
          }}
          {...props}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            background: trackColor,
            zIndex: -1,
            width: '100%',
            height: '100%',
          }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant='caption'
            component='div'
            sx={{ color: 'text.secondary', fontSize: '1.5rem' }}
          >
            {`${Math.round(value)}%`}
          </Typography>
        </Box>
      </Box>
    </Backdrop>
  )
}

export default BackdropLoadingLabel
