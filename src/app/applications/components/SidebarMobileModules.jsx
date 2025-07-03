import { KeyboardArrowRight } from '@mui/icons-material'
import { Box, IconButton, Menu } from '@mui/material'
import { useState } from 'react'
import { sidebarMobileContainerOptions } from './styles'
import { MenuAlerts, MenuTreasury } from '.'
import { useLocation } from 'react-router-dom'

const SidebarMobileModules = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const { pathname } = useLocation()

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const isTreasuryMenu = pathname.includes('treasury')

  return (
    <Box sx={sidebarMobileContainerOptions}>
      <IconButton
        sx={{ mt: 0, ml: '10px' }}
        onClick={handleClickMenu}
      >
        <KeyboardArrowRight
          variant='extended'
          fontSize='large'
          color='primary'
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {isTreasuryMenu ? <MenuTreasury /> : <MenuAlerts handleClose={() => {}} />}
      </Menu>
    </Box>
  )
}

export default SidebarMobileModules
