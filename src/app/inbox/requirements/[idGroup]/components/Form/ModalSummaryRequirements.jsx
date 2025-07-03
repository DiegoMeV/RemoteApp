import IdToModal from '@/app/inbox/registry/[idGroup]/components/IdToModal'
import { Box, Button, ListItem, ListItemText, Modal, Typography } from '@mui/material'
import {
  containerImgSigedoc,
  containerListItemModal,
  containerModal,
  imgStyleSigedoc,
} from '../../styles'
import { useNavigate } from 'react-router-dom'
import { formatToLocaleDate } from '@/lib'
import { relatedRequirementsSigedoc } from '../../funcs'

const ModalSummaryRequirements = ({
  open = false,
  processIdentifier = {},
  isSigedocSummary = false,
  isParentOrigin = false,
  infoStep = {},
}) => {
  const navigate = useNavigate()

  const additionalData = processIdentifier?.data?.processData?.additionalData ?? {}

  const sigedocId = additionalData?.SIGEDOCcodigoDeSeguimiento ?? 'No se genero SIGEDOC'
  const sigedocDate = additionalData?.SIGEDOCfechaRadicacion ?? ''
  const urlSigedoc = `data:image/png;base64,${additionalData?.archivo}`

  const typeProcessOrigin = {
    label: 'Identificador proceso origen:',
    value: infoStep?.relatedRequirements?.identifier ?? '',
  }

  const sigedocTypeProcessOrigin = relatedRequirementsSigedoc(infoStep) ?? []

  const showOriginInfo = [typeProcessOrigin, ...sigedocTypeProcessOrigin]

  return (
    <Modal open={open}>
      <Box sx={containerModal}>
        <Typography
          variant='h5'
          color='primary'
          mb='30px'
        >
          Radicación completada
        </Typography>
        <IdToModal summaryInfo={processIdentifier} />
        {new Date(processIdentifier?.data?.createdAt).toLocaleString() ? (
          <ListItem sx={containerListItemModal}>
            <ListItemText>Fecha de Inicio:</ListItemText>
            <ListItemText>
              {new Date(processIdentifier?.data?.createdAt).toLocaleString()}
            </ListItemText>
          </ListItem>
        ) : null}
        {isSigedocSummary && (
          <Box>
            <ListItem sx={{ ...containerListItemModal, fontWeight: 900 }}>
              <ListItemText>Codigo de seguimiento SIGEDOC:</ListItemText>
              <ListItemText>{sigedocId}</ListItemText>
            </ListItem>
            <ListItem sx={containerListItemModal}>
              <ListItemText>Fecha de Radicacion SIGEDOC:</ListItemText>
              <ListItemText>{formatToLocaleDate(sigedocDate)}</ListItemText>
            </ListItem>
            <ListItem sx={containerImgSigedoc}>
              <img
                src={urlSigedoc}
                style={imgStyleSigedoc}
                alt='Imagen del codigo de sigedoc'
              />
            </ListItem>
          </Box>
        )}
        {isParentOrigin && (
          <Box>
            {showOriginInfo.map((info, index) => {
              return (
                <ListItem
                  key={index}
                  sx={{ ...containerListItemModal, fontWeight: 900 }}
                >
                  <ListItemText>{info.label}</ListItemText>
                  <ListItemText>{info.value}</ListItemText>
                </ListItem>
              )
            })}
          </Box>
        )}
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

export default ModalSummaryRequirements
