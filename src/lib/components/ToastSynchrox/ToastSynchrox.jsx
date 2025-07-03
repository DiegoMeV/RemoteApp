import { toast, Toaster, ToastBar } from 'react-hot-toast'
import { CloseOutlined } from '@mui/icons-material'
import { ClassicIconButton } from '@/lib/ui'
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
                <ClassicIconButton
                  color='black'
                  onClick={() => toast.dismiss(t.id)}
                >
                  <CloseOutlined />
                </ClassicIconButton>
              )}
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  )
}

export default ToastSynchrox
