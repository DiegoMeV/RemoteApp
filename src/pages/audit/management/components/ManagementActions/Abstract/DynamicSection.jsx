import { Box } from '@mui/material'
import { DescriptionOutlined, InfoOutlined } from '@mui/icons-material'
import { DescriptionButton, CustomButton } from '.'
import styles from '../styles/Actions.module.css'
import { CustomModal, useBoolean } from '@/lib'
import { BasicDataInbox, CurrentDocumentsInbox } from '@/pages/audit/components'

const DynamicSection = ({ idProcess, activityInfo, processInfo, resumeText, setResumeText }) => {
  const BasicData = useBoolean()
  const CurrentDocuments = useBoolean()

  return (
    <>
      <div className='xs:col-span-12 md:col-span-6 lg:col-span-12'>
        <Box className={styles.abstractDynamicSectionContainer}>
          <DescriptionButton
            idProcess={idProcess}
            activityInfo={activityInfo}
            processInfo={processInfo}
            resumeText={resumeText}
            setResumeText={setResumeText}
          />
        </Box>
      </div>

      <div className='xs:col-span-12 md:col-span-6 lg:col-span-12'>
        <CustomButton
          onClick={BasicData.handleShow}
          icon={<InfoOutlined />}
          text='DATOS BÁSICOS'
        />
        <CustomButton
          onClick={CurrentDocuments.handleShow}
          icon={<DescriptionOutlined />}
          text='DOCUMENTOS VIGENTES'
        />
      </div>
      <CustomModal
        open={BasicData.show}
        handleClose={BasicData.handleShow}
        title='Datos básicos'
        size='xl'
        height='calc(100vh - 150px)'
      >
        <BasicDataInbox idProcess={idProcess} />
      </CustomModal>
      <CustomModal
        open={CurrentDocuments.show}
        handleClose={CurrentDocuments.handleShow}
        title='Documentos vigentes'
        size='xl'
        height='calc(100vh - 150px)'
      >
        <CurrentDocumentsInbox idProcess={idProcess} />
      </CustomModal>
    </>
  )
}

export default DynamicSection
