export const sxContent = (isTreasuryMenu) => ({
  width: '100%',
  overflow: 'auto',
  boxSizing: 'border-box',
  padding: '20px',
  paddingLeft: isTreasuryMenu ? '20px' : '35px',
  display: 'flex',
  flexDirection: 'column',
  height: 'calc(100vh - 70px)',
  mt: '5px',
})

export const sxSearchTables = {
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
  rowGap: '10px',
  backgroundColor: 'backgroundGrey1',
  height: 'calc(100vh - 170px)',
}

export const sxOptions = () => ({
  pl: 4,
})

export const sxContainer = () => ({
  width: '100%',
  backgroundColor: 'backgroundGrey1',
  padding: '20px',
})

export const sxButtons = () => ({
  paddingTop: '40px',
  width: '100%',
  gap: '30px',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
})

export const containerDesktopSidebar = (stateSideBar, isTreasuryMenu) => ({
  display: !isTreasuryMenu ? { xs: 'none', md: 'flex' } : 'none',
  width: stateSideBar ? '100%' : 0,
  maxWidth: '280px',
  transition: 'width 0.5s ease-out',
  position: 'relative',
})

export const containerLayoutModules = () => ({
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
})

export const containerSidebarMobile = () => ({ display: { xs: 'block', md: 'none' } })
