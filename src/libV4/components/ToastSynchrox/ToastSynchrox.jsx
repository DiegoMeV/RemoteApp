import { CloseOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import toast, { ToastBar, Toaster } from 'react-hot-toast'

const ToastSynchrox = () => {
  return (
    <Toaster
      toastOptions={{ duration: 8000 }}
      position='bottom-left'
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              {icon}
              {message}
              {t.type !== 'loading' && (
                <IconButton
                  aria-label='close'
                  color='black'
                  onClick={() => toast.dismiss(t.id)}
                >
                  <CloseOutlined />
                </IconButton>
              )}
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  )
}

export default ToastSynchrox
