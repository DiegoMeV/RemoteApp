import DocumentsByProcessModel from '@/app/inbox/[...ids]/components/ManagementActions/Notifications/Notification/components/DocumentsByProcessModel'
import { CloudUpload } from '@mui/icons-material'
import { Button, Grid, styled } from '@mui/material'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

const ButtonsDocSIGEDOC = ({
  handleFileUpload,
  disabled,
  validateBtnDisabled,
  documentProcessModal,
  isProcessFiles,
  selectDocOfValueList,
  idProcess,
  arrDoc,
}) => {
  return (
    <Grid
      item
      container
      xs={12}
      columnGap={2}
    >
      <Button
        component='label'
        variant='contained'
        disabled={disabled || !!validateBtnDisabled}
        tabIndex={-1}
        startIcon={<CloudUpload />}
        onChange={handleFileUpload}
      >
        Subir archivo
        <VisuallyHiddenInput type='file' />
      </Button>
      {isProcessFiles && (
        <Button
          disabled={disabled || !!validateBtnDisabled}
          variant='contained'
          onClick={documentProcessModal?.handleShow}
        >
          Documentos del proceso
        </Button>
      )}
      {isProcessFiles && documentProcessModal?.show && (
        <DocumentsByProcessModel
          idProcess={idProcess}
          documentProcessModal={documentProcessModal}
          selectDocOfValueList={selectDocOfValueList}
          arrayOfFiles={arrDoc}
        />
      )}
    </Grid>
  )
}

export default ButtonsDocSIGEDOC
