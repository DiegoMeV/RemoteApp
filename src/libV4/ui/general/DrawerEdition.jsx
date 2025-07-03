import { Close } from '@mui/icons-material'
import { Drawer, IconButton, Typography } from '@mui/material'

const DrawerEdition = ({ children, title, ...props }) => {
  return (
    <Drawer
      {...props}
      anchor='right'
      sx={{
        zIndex: 1100,
        '& .MuiDrawer-paper': {
          width: '600px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        },
      }}
    >
      {title && (
        <div className='flex justify-between items-center'>
          <Typography
            color='primary'
            variant='h5'
          >
            {title ?? ''}
          </Typography>
          <IconButton onClick={props?.onClose}>
            <Close />
          </IconButton>
        </div>
      )}
      {children}
    </Drawer>
  )
}

export default DrawerEdition
