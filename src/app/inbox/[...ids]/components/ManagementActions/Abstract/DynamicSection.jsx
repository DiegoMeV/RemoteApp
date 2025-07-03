import { Box, Grid } from '@mui/material'
import { DescriptionOutlined, History, InfoOutlined } from '@mui/icons-material'
import { DescriptionButton, CustomButton } from '.'
import styles from '../styles/Actions.module.css'
import { BasicDataInbox, CustomModal, useBoolean } from '@/lib'
import { CurrentDocumentsInbox } from '@/app/inbox/components/currentDocuments'
import { HistoricalTaskList } from '@/app/inbox/components/historical'

const DynamicSection = ({ idProcess, activityInfo, processInfo }) => {
  const BasicData = useBoolean()
  const CurrentDocuments = useBoolean()
  const historicalModal = useBoolean()

  return (
    <>
      <Grid
        item
        xs={12}
        md={6}
        lg={12}
      >
        <Box className={styles.abstractDynamicSectionContainer}>
          <DescriptionButton
            idProcess={idProcess}
            activityInfo={activityInfo}
            processInfo={processInfo}
          />
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        lg={12}
      >
        <Box
          display='flex'
          gap={2}
        >
          <CustomButton
            onClick={BasicData.handleShow}
            icon={<InfoOutlined />}
            text='DATOS BÁSICOS'
          />
          <CustomButton
            onClick={historicalModal.handleShow}
            icon={<History />}
            text='HISTÓRICO'
          />
        </Box>
        <CustomButton
          onClick={CurrentDocuments.handleShow}
          icon={<DescriptionOutlined />}
          text='DOCUMENTOS VIGENTES'
        />
      </Grid>

      <CustomModal
        open={BasicData.show}
        handleClose={BasicData.handleShow}
        title='Datos básicos'
        size='xl'
      >
        <BasicDataInbox idProcess={idProcess} />
      </CustomModal>
      <CustomModal
        open={historicalModal.show}
        handleClose={historicalModal.handleShow}
        title='Histórico'
        size='xl'
      >
        <HistoricalTaskList
          idProcess={idProcess}
          closeModal={historicalModal?.handleShow}
        />
      </CustomModal>

      <CustomModal
        open={CurrentDocuments.show}
        handleClose={CurrentDocuments.handleShow}
        title='Documentos vigentes'
        size='xl'
      >
        <CurrentDocumentsInbox idProcess={idProcess} />
      </CustomModal>
    </>
  )
}

export default DynamicSection
