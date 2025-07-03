import { Box } from '@mui/material'
import { useStoreState } from 'easy-peasy'
import { sxContent } from '../styles/stylesSx'

const ContentAlertsModule = ({ children }) => {
  const stateSideBar = useStoreState((state) => state.stateSideBar.stateSideBar)

  return (
    <Box
      component='main'
      sx={sxContent(stateSideBar)}
    >
      {children}
    </Box>
  )
}

export default ContentAlertsModule
