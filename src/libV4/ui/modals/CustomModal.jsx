import { Close } from '@mui/icons-material'
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from '@mui/material'
import styles from './styles/CustomModal.module.css'
import { titleStyles } from './styles'

const CustomModal = ({
  open,
  handleClose,
  modalType,
  onSubmit,
  size,
  height,
  maxHeight,
  title,
  children,
  actions,
  loading = false,
  titleColor = 'primary',
  dialogClassName = '',
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth={size ?? 'md'}
      className={dialogClassName}
    >
      {title && (
        <>
          <DialogTitle className={styles.containerTitle}>
            <Typography
              color={titleColor}
              sx={titleStyles}
            >
              {title}
            </Typography>
            <IconButton
              color='primary'
              onClick={handleClose}
              disabled={loading}
            >
              <Close color='secondary' />
            </IconButton>
          </DialogTitle>
          <Divider color='#CFCFCF' />
        </>
      )}
      <Box
        component={modalType}
        onSubmit={onSubmit}
      >
        <DialogContent sx={{ height: height, maxHeight: maxHeight }}>
          {' '}
          {loading && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                zIndex: 1,
              }}
            >
              <CircularProgress />
            </Box>
          )}
          {children}
        </DialogContent>
        {actions && actions.length > 0 && (
          <DialogActions>
            {actions.map((action, index) => (
              <Button
                key={index}
                variant='contained'
                type={action?.type ?? 'button'}
                disabled={action?.disabled || loading}
                {...action}
              >
                {action.label}
              </Button>
            ))}
          </DialogActions>
        )}
      </Box>
    </Dialog>
  )
}

export default CustomModal
