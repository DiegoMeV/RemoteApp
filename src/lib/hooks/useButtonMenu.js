import { useState } from 'react'

const useButtonMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return {
    anchorEl,
    open,
    handleClick,
    handleClose,
  }
}

export default useButtonMenu
