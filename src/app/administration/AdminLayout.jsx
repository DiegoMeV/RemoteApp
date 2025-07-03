import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { IconButton, Menu } from '@mui/material'
import { Sidebar } from '@/libV4'
import { AdminListOptions } from './components'

const AdminLayout = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className='xs:block md:flex'>
      <Sidebar className='xs:hidden md:block'>
        <AdminListOptions />
      </Sidebar>

      <div className='xs:pl-5 md:hidden pt-4'>
        <IconButton
          title='Menú Administración'
          onClick={handleClick}
          size='large'
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <AdminListOptions />
        </Menu>
      </div>

      <section className='w-full h-[calc(100vh-65px)] xs:px-5 md:px-10 xs:py-0 md:py-8'>
        <Outlet />
      </section>
    </div>
  )
}

export default AdminLayout
