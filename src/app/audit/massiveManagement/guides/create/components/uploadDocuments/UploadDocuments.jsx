import { CustomModal, isEmpty, useBoolean } from '@/lib'
import { Box, Button, Grid, Typography } from '@mui/material'
import { UploadFile } from '@mui/icons-material'
import { useEffect } from 'react'
import { ModalUploadFiles } from '@/libV4'

const UploadDocuments = ({ form, setActiveStep }) => {
  const uploadDocModal = useBoolean()
  useEffect(() => {
    if (form.getValues('rowsCount') !== 0 && !isEmpty(form.getValues('rows'))) {
      setActiveStep(0)
    }
  }, [])
  const infoTypeDoc = {
    id: form.getValues('id'),
    FileColsSpecs: form.getValues('FileColsSpecs'),
  }

  return (
    <Box
      m={2}
      sx={{
        padding: 3,
        backgroundColor: 'backgroundGrey1',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Grid
        container
        spacing={4}
        alignItems='center'
        justifyContent='center'
      >
        <Grid
          item
          xs={12}
        >
          <Typography
            textAlign='center'
            variant='h5'
            sx={{
              fontWeight: 'bold',
              color: 'secondary',
              marginBottom: 2,
            }}
          >
            Recuerde que el archivo debe tener el formato correcto para poder ser cargado.
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          md={5}
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button
            variant='contained'
            component='label'
            onClick={uploadDocModal.handleShow}
            startIcon={<UploadFile />}
            sx={{
              backgroundColor: '#1976d2',
              color: '#fff',
              padding: '12px 20px',
              fontSize: '16px',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: '#115293',
              },
            }}
          >
            Cargar Archivo
          </Button>
        </Grid>
      </Grid>
      <CustomModal
        open={uploadDocModal.show}
        handleClose={uploadDocModal.handleShow}
        title='Gestión masiva de expedientes'
        size={'xl'}
        height={'80vh'}
      >
        <ModalUploadFiles
          closeModal={uploadDocModal.handleShow}
          infoTypeDoc={infoTypeDoc}
          body={'guides'}
          pushUrl={`/${infoTypeDoc.id}/guides`}
          pushBase={'/guides-groups'}
        />
      </CustomModal>
    </Box>
  )
}

export default UploadDocuments
