import { BasicTitle } from '@/lib'
import MenuIcon from '@mui/icons-material/Menu'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'
import { menuOptions } from '../../../constants'

const MasterTitle = () => {
  const [anchorEl, setAnchorEl] = useState(null)

  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <BasicTitle
        title='Obligación presupuestal'
        titleStyles={{ display: 'flex' }}
        backpath={-1}
        typographyProps={{ className: 'w-full' }}
      >
        <IconButton onClick={handleClick}>
          <MenuIcon
            sx={{
              fontSize: '30px',
            }}
          />
        </IconButton>
      </BasicTitle>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {menuOptions?.map((option, index) => (
          <MenuItem key={index}>{option.label}</MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default MasterTitle
