import { useStoreActions } from 'easy-peasy'
import { useState } from 'react'

const useBoolean = (defaultValue, confirmModalProps) => {
  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )
  const [show, setShow] = useState(defaultValue ?? false)
  const handleShow = () => setShow(!show)

  const handleShowConfirm = (confirmFun) => {
    setConfirmAlertProps({
      open: true,
      ...confirmModalProps,
      onConfirm: () => {
        if (confirmFun) {
          confirmFun?.()
        }
        setShow(!show)
      },
    })
  }

  return { show, handleShow, handleShowConfirm }
}

export default useBoolean
