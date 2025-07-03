import { CancelOutlined, CheckCircleOutline, ErrorOutline, InfoOutlined } from '@mui/icons-material'
import { Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material'
import { useRootStore } from '../../store'

const iconSelect = {
  success: <CheckCircleOutline sx={{ fontSize: '120px', color: '#a5dc86' }} />,
  info: (
    <InfoOutlined
      color='primary'
      sx={{ fontSize: '120px' }}
    />
  ),
  warning: (
    <ErrorOutline
      color='warning'
      sx={{ fontSize: '120px' }}
    />
  ),
  error: (
    <CancelOutlined
      color='error'
      sx={{ fontSize: '120px' }}
    />
  ),
}

const ConfirmModal = () => {
  const { confirmAlertProps, handleClose, clearConfirmAlertProps } = useRootStore()
  const { open, title, content, icon, onConfirm } = confirmAlertProps

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth='xs'
    >
      <DialogContent>
        <div className='flex flex-col justify-evenly items-center min-h-[260px]'>
          {iconSelect[icon]}
          {title && (
            <Typography
              color='#757575'
              variant='h4'
              align='center'
            >
              {title}
            </Typography>
          )}
          {content && (
            <Typography
              color='#757575'
              variant='body1'
              fontSize='1.4rem'
              align='center'
            >
              {content}
            </Typography>
          )}
        </div>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <Button
          variant='contained'
          color='error'
          onClick={() => {
            handleClose()
            clearConfirmAlertProps()
          }}
        >
          Cancelar
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={() => {
            onConfirm()
            handleClose()
            clearConfirmAlertProps()
          }}
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmModal
