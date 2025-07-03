import { BasicTitle } from '@/lib'
import MenuIcon from '@mui/icons-material/Menu'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'
import { getMenuOptions } from '../../../constants'
import { useNavigate } from 'react-router-dom'

const MasterTitle = ({ globalVariables, ordenPagouData }) => {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)

  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const menuOptions = getMenuOptions({
    bloquear_imp: globalVariables?.bloquear_imp,
    navigate,
    ordenPagouData: ordenPagouData?.data?.[0],
  })

  return (
    <>
      <BasicTitle
        title='Orden de Pago Única'
        titleStyles={{ display: 'flex' }}
        backpath={-1}
        typographyProps={{ className: 'w-full' }}
      >
        <div className='w-full flex justify-end items-center'>
          <IconButton onClick={handleClick}>
            <MenuIcon
              sx={{
                fontSize: '30px',
              }}
            />
          </IconButton>
        </div>
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
            disabled={option.disabled}
            onClick={option.onClick ? () => option.onClick() : handleClose}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default MasterTitle
