import { a11yProps } from '@/libV4'
import { Box, Tab, Tabs } from '@mui/material'

const TabOptions = ({ tabValue, handleChangeTab }) => {
  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        backgroundColor: 'backgroundGrey2',
        width: '100%',
      }}
    >
      <Tabs
        value={tabValue}
        onChange={handleChangeTab}
        aria-label='lab API tabs example'
        sx={{ paddingTop: '0' }}
      >
        <Tab
          label='Información y revisión de la mesa'
          {...a11yProps(0)}
        />
        <Tab
          label='Comentarios de la mesa'
          {...a11yProps(1)}
        />
      </Tabs>
    </Box>
  )
}

export default TabOptions
