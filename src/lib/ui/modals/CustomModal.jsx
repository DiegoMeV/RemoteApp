import { Close } from '@mui/icons-material'
import {
  Box,
  Button,
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
  title,
  children,
  actions,
  shouldClose = true,
  minHeight,
  maxHeight,
  titleColor = 'primary',
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth={size ?? 'md'}
      sx={{ minWidth: '350px' }}
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
            {shouldClose && (
              <IconButton
                color='primary'
                onClick={handleClose}
              >
                <Close color='secondary' />
              </IconButton>
            )}
          </DialogTitle>
          <Divider color='#CFCFCF' />
        </>
      )}
      <Box
        component={modalType}
        onSubmit={onSubmit}
      >
        <DialogContent sx={{ height: height, minHeight: minHeight ?? 300, maxHeight: maxHeight }}>
          {children}
        </DialogContent>
        {actions && actions.length > 0 && (
          <DialogActions>
            {actions.map((action, index) => (
              <Button
                key={index}
                variant='contained'
                type={action?.type ?? 'button'}
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
