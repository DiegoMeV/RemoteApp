import { useState } from 'react'

const useOptionsConstructor = () => {
  const [open, setOpen] = useState(false)
  const openClose = () => setOpen(!open)

  const onOpen = (ev, reason) => {
    switch (reason) {
      case 'toggle':
        openClose()
        break
      case 'mouseEnter':
        openClose()
        break
    }
  }

  const onClose = (ev, reason) => {
    switch (reason) {
      case 'toggle':
        openClose()
        break
    }
  }

  return {
    open,
    onOpen,
    onClose,
    openClose,
  }
}
export default useOptionsConstructor
