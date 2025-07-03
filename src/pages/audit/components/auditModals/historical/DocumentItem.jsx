import { AccessControl } from '@/libV4'
import { Download } from '@mui/icons-material'
import { Box, Divider, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { useStoreActions } from 'easy-peasy'

const DocumentItem = ({ documentInfo }) => {
  const setPreviewer = useStoreActions((actions) => actions.previewer.setPreviewer)

  return (
    <AccessControl
      privilege='procesos.historico.descargar_documentos'
      nodeContent={
        <Typography
          variant='body2'
          color='textSecondary'
        >
          {documentInfo?.name ?? ''}
        </Typography>
      }
    >
      <ListItemButton
        sx={{ padding: '5px 15px 1px 15px', display: 'flex', flexDirection: 'column' }}
        onClick={async () => {
          await setPreviewer({
            open: true,
            idDocument: documentInfo?.id,
            idVersion: documentInfo?.docVersionData?.id,
            loadingPreviewer: true,
          })
        }}
      >
        <Box
          display='flex'
          width='100%'
          justifyContent='space-between'
        >
          <ListItemText
            primary={documentInfo?.name}
            sx={{ textDecoration: 'underline' }}
          />
          <ListItemIcon>
            <Download />
          </ListItemIcon>
        </Box>
        <ListItemText sx={{ width: '100%', textAlign: 'start' }}>
          Estado : {documentInfo?.documentStatus}
        </ListItemText>
      </ListItemButton>
      <Divider />
    </AccessControl>
  )
}
export default DocumentItem
