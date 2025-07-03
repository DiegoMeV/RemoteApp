import { CustomTabHeaders } from '@/lib'
import { Add } from '@mui/icons-material'
import { Button, Grid } from '@mui/material'
import { templateTabs } from '../../funcs'

const TabsTemplates = ({ currentTab, tabs = [], handleChangeTab, handleAdd }) => {
  const currentTabs = templateTabs ?? tabs
  return (
    <>
      <Grid
        item
        xs={10.5}
      >
        <CustomTabHeaders
          value={currentTab}
          variant='scrollable'
          scrollButtons='auto'
          options={currentTabs}
          handleChange={handleChangeTab}
        />
      </Grid>
      <Grid
        item
        xs={1.5}
        display='flex'
        justifyContent='flex-end'
        alignItems='center'
      >
        <Button
          variant='contained'
          color='primary'
          size='small'
          onClick={handleAdd}
          fullWidth
          endIcon={<Add />}
          sx={{ height: '50%' }}
        >
          Agregar
        </Button>
      </Grid>
    </>
  )
}

export default TabsTemplates
