import {
  CancelOutlined,
  CheckCircleOutline,
  ErrorOutline,
  InfoOutlined,
  QuestionMarkOutlined,
} from '@mui/icons-material'
import { Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material'
import styles from './styles/ConfirmModal.module.css'
import { useStoreActions, useStoreState } from 'easy-peasy'

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
  question: (
    <QuestionMarkOutlined
      color='warning'
      sx={{ fontSize: '120px' }}
    />
  ),
}

const ConfirmModal = () => {
  const {
    open,
    title,
    content,
    icon,
    maxWidth = 'xs',
    onConfirm = () => {},
    onClose = () => {},
  } = useStoreState((state) => state.confirmAlert.confirmAlertProps)
  const handleClose = useStoreActions((actions) => actions.confirmAlert.handleClose)
  const clearConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.clearConfirmAlertProps
  )
  const handleOnClose = () => {
    onClose()
    handleClose()
    clearConfirmAlertProps()
  }
  return (
    <Dialog
      open={open}
      onClose={handleOnClose}
      fullWidth
      maxWidth={maxWidth}
    >
      <DialogContent>
        <div className={styles.modalContent}>
          {iconSelect[icon]}
          {title && (
            <Typography
              color='secondary'
              variant='h3'
              align='center'
            >
              {title}
            </Typography>
          )}
          {content && (
            <Typography
              color='secondary'
              variant='body1'
              fontSize='1.4rem'
              align='center'
              style={{ whiteSpace: 'pre-line' }}
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
            onClose()
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
