export const getSxIconBorder = (dark) => ({
  border: dark === 'dark' ? 'solid 1px #757575' : 'solid 2px rgba(0, 0, 0, 0.12)',
})

export const getSxBackground = (dark) => ({
  backgroundColor: dark === 'dark' ? '#121212' : '#FFFFFF',
})

export const getSxIconHover = (dark) => ({
  '&:hover': {
    backgroundColor: dark === 'dark' ? '#272727' : '#DFDFDF',
  },
})

export const getSxContainer = (stateSideBar) => ({
  right: stateSideBar ? '-20px' : '-30px',
})

export const getSxDivider = (dark) => ({
  height: 'calc(100vh - 70px)',
  borderRight: dark === 'dark' ? 'solid 2px #757575' : 'solid 2px rgba(0, 0, 0, 0.12)',
})

export const sxSidebar = (stateSideBar, dark) => ({
  width: stateSideBar ? '100%' : 0,
  maxWidth: '280px',
  transition: 'max-width 0.5s ease-out',
  height: '100%',
  overflow: 'hidden',
  borderRight: dark === 'dark' ? 'solid 1px #757575' : 'solid 1px rgba(0, 0, 0, 0.12)',
})

export const containerSidebar = (stateSideBar) => ({
  display: { xs: 'none', md: 'flex' },
  width: stateSideBar ? '100%' : 0,
  maxWidth: '280px',
  height: 'calc(100vh - 70px)',
  transition: 'width 0.5s ease-out',
  position: 'relative',
})
