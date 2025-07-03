import { useState } from 'react'

import MenuIcon from '@mui/icons-material/Menu'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { menuOptions } from '../../../constants'
import { BasicTitle } from '@/libV4'

const MasterTitle = ({ agreementStatus = '' } = {}) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <BasicTitle
        title='Información Convenio'
        className='flex flex-row justify-between items-center'
      >
        <IconButton onClick={handleClick}>
          <MenuIcon />
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
          <MenuItem
            key={index}
            disabled={option?.id === 'receiptsIssued' && agreementStatus !== 'I'}
          >
            {option?.label ?? ''}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

export default MasterTitle
