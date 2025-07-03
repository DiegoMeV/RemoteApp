import { useStoreState } from 'easy-peasy'
import { containerDesktopSidebar, containerSidebarMobile } from '../styles'
import { SideBar } from '@/lib'
import { MenuAlerts, SidebarMobileModules } from '.'
import { Box } from '@mui/material'
import { useLocation } from 'react-router-dom'

const AlertSidebarContainer = () => {
  const stateSideBar = useStoreState((state) => state.stateSideBar.stateSideBar)
  const { pathname } = useLocation()
  const isTreasuryMenu = pathname.includes('treasury')

  return (
    <>
      <Box sx={containerDesktopSidebar(stateSideBar, isTreasuryMenu)}>
        <SideBar>
          <MenuAlerts />
        </SideBar>
      </Box>

      <Box sx={containerSidebarMobile}>
        <SidebarMobileModules />
      </Box>
    </>
  )
}

export default AlertSidebarContainer
