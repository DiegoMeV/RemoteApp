import { Box, Button, ListItem, ListItemText, Modal, Typography } from '@mui/material'
import IdProcessCopy from './IdProcessCopy'
import { formatDateToCustomString } from '@/lib/funcs'
import { useNavigate } from 'react-router-dom'
import styles from './ModalRegistrySummary.module.css'
import { useStoreActions } from 'easy-peasy'

const ConfirmProcess = ({ infoProcess, sticker }) => {
  if (typeof infoProcess?.data !== 'object' || Array.isArray(infoProcess?.data)) {
    infoProcess.data = infoProcess?.data?.[0]
  }
  const setPreviewer = useStoreActions((actions) => actions.previewer.setPreviewer)
  const navigate = useNavigate()
  return (
    <Modal
      open={true}
      onClose={() => navigate('/inbox')}
    >
      <Box
        className={styles.containerModal}
        sx={{ backgroundColor: 'backgroundWhite1' }}
      >
        <Typography
          variant='h5'
          color='primary'
          mb='30px'
        >
          Radicación completada
        </Typography>

        {sticker && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              textAlign: 'center',
            }}
          >
            <Typography
              variant='h6'
              color='textPrimary'
            >
              Sticker de radicación
            </Typography>
            <Box
              component='img'
              src={sticker}
              alt='Sticker de radicación'
              height={200}
              sx={{
                borderRadius: 1,
                boxShadow: 3,
              }}
            />
            <Button
              color='success'
              variant='contained'
              onClick={() =>
                setPreviewer({
                  open: true,
                  idDocument:
                    infoProcess?.data?.processData?.idDocumentStickerPdf ??
                    infoProcess?.data?.processData?.idDocumentSticker,
                  loadingPreviewer: true,
                })
              }
              sx={{
                mt: 1,
              }}
            >
              Descargar
            </Button>
          </Box>
        )}

        <IdProcessCopy summaryInfo={infoProcess} />
        {formatDateToCustomString(infoProcess?.data?.createdAt) ? (
          <ListItem className={styles.listItemSummary}>
            <ListItemText>Fecha de Inicio :</ListItemText>
            <ListItemText>{formatDateToCustomString(infoProcess?.data?.createdAt)}</ListItemText>
          </ListItem>
        ) : null}

        <Button
          variant='contained'
          color='primary'
          sx={{ mt: 2 }}
          onClick={() => navigate('/inbox')}
        >
          Volver a bandeja
        </Button>
      </Box>
    </Modal>
  )
}

export default ConfirmProcess
