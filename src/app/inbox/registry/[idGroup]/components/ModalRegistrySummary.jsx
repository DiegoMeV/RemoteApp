import { Box, Button, ListItem, ListItemText, Modal, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { BackdropLoading, useCreateProcess } from '@/lib'
import toast from 'react-hot-toast'
import styles from '../styles/ModalRegistrySummary.module.css'
import IdToModal from './IdToModal'

const ModalRegistrySummary = ({ open, infoProcess, basicDataProcess, setActiveStep }) => {
  const navigate = useNavigate()
  const {
    data: summaryInfo,
    isLoading,
    isError,
  } = useCreateProcess({ infoProcess, basicDataProcess })

  if (isError) {
    setActiveStep(2)
    toast.error('Error al crear el proceso')
    return
  }

  return (
    <>
      <BackdropLoading loading={isLoading} />
      {!isLoading && (
        <Modal open={open}>
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
            <IdToModal summaryInfo={summaryInfo} />
            {basicDataProcess?.map((input, index) => {
              return (
                <ListItem
                  key={index}
                  className={styles.listItemSummary}
                >
                  <ListItemText>{input.name}:</ListItemText>
                  <ListItemText>{input.value}</ListItemText>
                </ListItem>
              )
            })}
            {new Date(summaryInfo?.data?.createdAt).toLocaleString() ? (
              <ListItem className={styles.listItemSummary}>
                <ListItemText>Fecha de Inicio :</ListItemText>
                <ListItemText>
                  {new Date(summaryInfo?.data?.createdAt).toLocaleString()}
                </ListItemText>
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
      )}
    </>
  )
}
export default ModalRegistrySummary
