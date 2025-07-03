import { useState } from 'react'
import { Button, Menu } from '@mui/material'
import { SignpostOutlined } from '@mui/icons-material'
import { useGetProcessInitOptions } from '@/lib'
import InboxMenuAllApps from './InboxMenuAllApps'
import { AccessControl } from '@/libV4'

const RegistryOptions = () => {
  const [anchorEl, setAnchorEl] = useState(null)

  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event?.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const { data: infoApplications } = useGetProcessInitOptions()
  return (
    <>
      {infoApplications?.data?.length > 0 && (
        <AccessControl privilege='procesos.bandeja.radicar'>
          <Button
            startIcon={<SignpostOutlined />}
            variant='contained'
            onClick={handleClick}
            fullWidth
          >
            Radicar
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            sx={{ maxHeight: 'calc(100vh - 200px)' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            transformOrigin={{ horizontal: 'left', vertical: 'top' }}
          >
            {infoApplications?.data?.map((app, index) => {
              return (
                <InboxMenuAllApps
                  app={app}
                  index={index}
                  key={index}
                />
              )
            })}
          </Menu>
        </AccessControl>
      )}
    </>
  )
}

export default RegistryOptions
