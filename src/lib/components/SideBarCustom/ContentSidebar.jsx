import { Box } from '@mui/material'
import { sxSidebar } from './styles/stylesSx'
import { useStoreState } from 'easy-peasy'

const ContentSidebar = ({ children, stateSideBar }) => {
  const dark = useStoreState((state) => state.darkTheme.dark)

  return <Box sx={sxSidebar(stateSideBar, dark)}>{children}</Box>
}

export default ContentSidebar
