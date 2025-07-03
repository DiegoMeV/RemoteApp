import { BasicTitle } from '@/lib'
import MenuIcon from '@mui/icons-material/Menu'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'
import { getMenuOptions } from '../../../constants'
import { useNavigate } from 'react-router-dom'

const MasterTitle = ({ globalVariables, ordenPagoData }) => {
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
    globalVariables,
    navigate,
    ordenPagoData: ordenPagoData?.data?.[0],
  })

  return (
    <>
      <BasicTitle
        title='Orden de Pago Directa'
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
        {menuOptions?.map((option, index) => {
          if (option?.hidden) return null
          return (
            <MenuItem
              key={index}
              disabled={option.disabled}
              onClick={option.onClick ? () => option.onClick() : handleClose}
            >
              {option.label}
            </MenuItem>
          )
        })}
      </Menu>
    </>
  )
}

export default MasterTitle
