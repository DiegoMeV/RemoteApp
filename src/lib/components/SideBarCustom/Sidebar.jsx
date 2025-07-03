import { Box } from '@mui/material'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { NavigateBefore, NavigateNext } from '@mui/icons-material'
import { ClassicIconButton } from '@/lib'
import ContentSidebar from './ContentSidebar'
import {
  getSxIconBorder,
  getSxBackground,
  getSxContainer,
  getSxDivider,
  getSxIconHover,
  containerSidebar,
} from './styles/stylesSx'
import styles from './styles/Sidebar.module.css'

const SideBar = ({ children }) => {
  const dark = useStoreState((state) => state.darkTheme.dark)
  const stateSideBar = useStoreState((state) => state.stateSideBar.stateSideBar)
  const setStateSideBar = useStoreActions((actions) => actions.stateSideBar.setStateSideBar)

  const handleOnClick = () => {
    setStateSideBar(!stateSideBar)
  }

  return (
    <Box sx={containerSidebar(stateSideBar)}>
      <Box
        className={styles.container}
        sx={{ ...getSxContainer(stateSideBar), ...getSxBackground(dark) }}
      >
        {stateSideBar ? (
          <>
            <ClassicIconButton
              onClick={handleOnClick}
              title='CONTRAER'
              placement='right'
              color='primary'
              sx={{ ...getSxIconBorder(dark), ...getSxIconHover(dark) }}
            >
              <NavigateBefore className={styles.icon} />
            </ClassicIconButton>
          </>
        ) : (
          <>
            <Box
              onClick={setStateSideBar}
              className={styles.divider}
              sx={getSxDivider(dark)}
            />
            <ClassicIconButton
              onClick={handleOnClick}
              title='EXPANDIR'
              placement='right'
              color='primary'
              sx={{ ...getSxIconBorder(dark), ...getSxBackground(dark), ...getSxIconHover(dark) }}
            >
              <NavigateNext className={styles.icon} />
            </ClassicIconButton>
          </>
        )}
      </Box>
      <ContentSidebar
        stateSideBar={stateSideBar}
        setStateSideBar={setStateSideBar}
      >
        {children}
      </ContentSidebar>
    </Box>
  )
}

export default SideBar
