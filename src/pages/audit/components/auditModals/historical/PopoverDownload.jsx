import { Box, Divider, ListItemButton, ListItemIcon, ListItemText, Popover } from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download'
import { ClassicIconButton } from '@/lib'
import { useState } from 'react'
import styles from './styles/PopoverDownload.module.css'
import { AccessControl } from '@/libV4'

const PopoverDownload = () => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  const documents = ['Documento 1', 'Documento 2', 'Documento 3']
  return (
    <Box className={styles.containerPopOver}>
      <AccessControl privilege='procesos.historico.descargar_documentos'>
        <ClassicIconButton
          onClick={() => handleClick}
          title='Descargar documentos'
          placement='bottom'
        >
          <DownloadIcon />
        </ClassicIconButton>
      </AccessControl>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box
          size='small'
          sx={{ backgroundColor: 'backgroundWhite1' }}
        >
          {documents.map((document, index) => (
            <Box key={index}>
              <ListItemButton sx={{ padding: '5px 15px 1px 15px' }}>
                <ListItemText
                  primary={document}
                  sx={{ textDecoration: 'underline' }}
                />
                <ListItemIcon sx={{ justifyContent: 'flex-end' }}>
                  <DownloadIcon />
                </ListItemIcon>
              </ListItemButton>
              <Divider />
            </Box>
          ))}
        </Box>
      </Popover>
    </Box>
  )
}

export default PopoverDownload
