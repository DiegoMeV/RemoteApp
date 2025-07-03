import { Box, Button, Divider } from '@mui/material'
import { MenuTask } from '.'
import { handleClickMenu } from '../hooks'
import { AddBoxOutlined } from '@mui/icons-material'
import { sxAccordionStyles } from '../styles'

const ButtonAddAction = ({ anchorEl, setAnchorEl, openMenu, menuOptionsActions, task }) => {
  return (
    <Box>
      <Divider />
      <Button
        variant='contained'
        color='primary'
        size='small'
        onClick={(event) => handleClickMenu(event, 'addAction', setAnchorEl, anchorEl)}
        startIcon={<AddBoxOutlined />}
        sx={sxAccordionStyles.btnAddActionStyles}
      >
        Nueva Acción
      </Button>
      <MenuTask
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        openMenu={openMenu}
        showMenu={'addAction'}
        menuOptions={menuOptionsActions}
        task={task}
        horizontalPosition='left'
      />
    </Box>
  )
}

export default ButtonAddAction
