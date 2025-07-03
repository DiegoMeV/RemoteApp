import { ClassicIconButton } from '@/libV4'
import MenuIcon from '@mui/icons-material/Menu'
import { Menu } from '@mui/material'
import { useState } from 'react'

const MobileMenuOptions = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className='left-2'>
      <ClassicIconButton onClick={handleClick}>
        <MenuIcon fontSize='large' />
      </ClassicIconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {children}
      </Menu>
    </div>
  )
}

export default MobileMenuOptions
