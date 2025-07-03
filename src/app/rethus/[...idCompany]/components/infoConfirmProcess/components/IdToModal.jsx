import { Box, IconButton, ListItem, ListItemText, Typography } from '@mui/material'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import toast from 'react-hot-toast'
import { formatDateForTextfield } from '@/lib'

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
        <Typography sx={{ fontWeight: 'bold' }}>Número de radicado:</Typography>
      </ListItemText>
      <ListItemText>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Typography sx={{ fontWeight: 'bold' }}>{summaryInfo?.identifier ?? ''}</Typography>
          <IconButton
            onClick={() => copyClipboard(summaryInfo?.identifier)}
            aria-label='Copy'
            color='primary'
          >
            <ContentCopyOutlinedIcon />
          </IconButton>
        </Box>
      </ListItemText>
      <ListItemText>
        <Typography fontWeight='bold'>Fecha de radicación :</Typography>
      </ListItemText>
      <ListItemText>{formatDateForTextfield(summaryInfo?.createdAt)}</ListItemText>
    </ListItem>
  )
}

export default IdToModal
