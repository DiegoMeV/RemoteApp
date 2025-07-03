import { KeyboardArrowRight } from '@mui/icons-material'
import { Box, IconButton, Menu } from '@mui/material'
import { useButtonMenu } from '@/lib'
import { AdvancedSearchButton, PendingActivities, RegistryOptions } from '../components'

const MobileInboxMenuOptions = () => {
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
          <PendingActivities />
        </Menu>
        <Box
          display='flex'
          gap={2}
          alignItems='center'
        >
          <RegistryOptions />
          <AdvancedSearchButton />
        </Box>
      </Box>
    </Box>
  )
}

export default MobileInboxMenuOptions
