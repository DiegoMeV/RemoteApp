import { Box, Divider, LinearProgress, ListSubheader } from '@mui/material'
import { useState } from 'react'
import { useMenuApplications, useMenuHandlers } from './hooks'
import { Menu, Sidebar, useGetAllParams } from '@/libV4'

const MenuSidebarApplications = () => {
  const { itemId, idApplication } = useGetAllParams()

  const [fullMenu, setFullMenu] = useState([])
  const [openKeys, setOpenKeys] = useState([])
  const { getMenuApplications, loadingMenu, loadingApplications } = useMenuApplications(setFullMenu)
  const { handleOpenChange, handleClick } = useMenuHandlers({
    setOpenKeys,
    getMenuApplications,
    itemId,
    idApplication,
    fullMenu,
  })

  return (
    <Sidebar>
      <ListSubheader
        sx={{
          backgroundColor: 'backgroundWhite1',
        }}
      >
        Módulos
      </ListSubheader>
      <Divider variant='middle' />

      <Box
        height={'calc(100vh - 120px)'}
        backgroundColor='transparent'
        position='relative'
        minWidth='290px'
        sx={{ overflowY: 'auto' }}
      >
        {(loadingApplications || loadingMenu) && (
          <LinearProgress
            sx={{
              position: 'sticky',
              top: 0,
              zIndex: 1,
            }}
            width='100%'
            color='primary'
          />
        )}
        <Menu
          items={fullMenu}
          handleClick={handleClick}
          handleOpenChange={handleOpenChange}
          openKeys={openKeys}
        />
      </Box>
    </Sidebar>
  )
}

export default MenuSidebarApplications
