import { Box, IconButton, ListItem, ListItemText, Typography } from '@mui/material'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import toast from 'react-hot-toast'

const IdToModal = ({ summaryInfo } = {}) => {
  const copyClipboard = (textCopied) => {
    if (textCopied) {
      navigator.clipboard
        .writeText(textCopied)
        .then(() => {
          toast.success('El texto ha sido copiado')
        })
        .catch((error) => {
          toast.error(error)
        })
    }
  }
  return (
    <ListItem
      sx={{
        display: 'grid',
        gridTemplateColumns: '200px 1fr',
        borderBottom: '1px solid #C8C4C4',
      }}
    >
      <ListItemText>
        <Typography sx={{ fontWeight: 'bold' }}>Identificador:</Typography>
      </ListItemText>
      <ListItemText>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Typography sx={{ fontWeight: 'bold' }}>{summaryInfo?.data?.identifier}</Typography>
          <IconButton
            onClick={() => copyClipboard(summaryInfo?.data?.identifier)}
            aria-label='Copy'
            color='primary'
          >
            <ContentCopyOutlinedIcon />
          </IconButton>
        </Box>
      </ListItemText>
    </ListItem>
  )
}

export default IdToModal
