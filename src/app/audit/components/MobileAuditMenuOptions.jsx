import { useButtonMenu } from '@/lib'
import { KeyboardArrowRight } from '@mui/icons-material'
import { Box, IconButton, Menu } from '@mui/material'
import { AuditMenuOptions } from './MenuOptions'

const MobileAuditMenuOptions = () => {
  const processMenu = useButtonMenu()

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pr: 2 }}>
      <IconButton
        sx={{ mt: '10px', ml: '10px' }}
        id='basic-button'
        aria-haspopup='true'
        onClick={processMenu.handleClick}
      >
        <KeyboardArrowRight
          variant='extended'
          fontSize='large'
          color='primary'
          arial-label='menu sidebar'
        />
      </IconButton>
      <Box>
        <Menu
          id='basic-menu'
          anchorEl={processMenu.anchorEl}
          open={processMenu.open}
          onClose={processMenu.handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <AuditMenuOptions />
        </Menu>
      </Box>
    </Box>
  )
}

export default MobileAuditMenuOptions
