import { useState } from 'react'
import { Box, Button, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip } from '@mui/material'
import { GridMoreVertIcon } from '@mui/x-data-grid'
import { Delete, Edit } from '@mui/icons-material'
import { AccessControl } from '@/libV4'

const MoreOptions = ({ infoRow, setIdActivity, openModals }) => {
  const { handleEditActivity, handleDeleteNotification } = openModals
  const [anchorEl, setAnchorEl] = useState(null)

  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const moreOptions = [
    {
      onClick: () => handleEditActivity(),
      icon: <Edit />,
      text: 'Editar actividad',
      privilege: 'procesos.opciones_especiales.actualizar_datos_actividad',
    },
    {
      onClick: () => handleDeleteNotification(),
      icon: <Delete />,
      text: 'Eliminar notificación',
      privilege: 'procesos.opciones_especiales.eliminar_actividad',
    },
  ]
  return (
    <Box
      display='flex'
      height='100%'
      justifyContent='center'
    >
      <Box display='flex'>
        <Tooltip
          title='Más Opciones'
          arrow
        >
          <Button
            id='basic-button'
            onClick={handleClick}
            sx={{ minWidth: 50 }}
          >
            <GridMoreVertIcon />
          </Button>
        </Tooltip>

        <Menu
          id='basic-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {moreOptions?.map((item, index) => {
            const renderOptions = item?.render ?? true
            return (
              <AccessControl
                key={index}
                privilege={item?.privilege ?? ''}
              >
                {renderOptions && (
                  <MenuItem
                    key={index}
                    sx={item?.sx}
                    onClick={() => {
                      item?.onClick?.()
                      handleClose()
                      setIdActivity(infoRow?.id)
                    }}
                  >
                    <ListItemIcon>{item?.icon}</ListItemIcon>
                    <ListItemText>{item?.text}</ListItemText>
                  </MenuItem>
                )}
              </AccessControl>
            )
          })}
        </Menu>
      </Box>
    </Box>
  )
}

export default MoreOptions
