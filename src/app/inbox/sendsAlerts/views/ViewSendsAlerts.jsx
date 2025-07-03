import {
  AttachedDocumentsSIGEDOC,
  BackdropLoading,
  BasicTitle,
  bodyGenerateSIGEDOC,
  ErrorPage,
  Loading,
  useBoolean,
} from '@/lib'
import { Divider, Grid } from '@mui/material'
import { useState } from 'react'
import { StepperRequirements } from '../../components'
import { useForm } from 'react-hook-form'
import { ButtonsSendsAlertsForm, FormSteps } from '../components'
import { useNavigate } from 'react-router-dom'
import { editionProccessBody } from '../funcs'

import {
  useHandleActions,
  useProcessInfoAlerts,
  useRequestProcessAlerts,
  useRestRequestAlerts,
} from '../hooks'
import { useStoreState } from 'easy-peasy'

const ViewSendsAlerts = ({ idGroup, idProcess }) => {
  const userData = useStoreState((state) => state.user.userData)
  const stepsAlertsSender = ['Selección de proceso', 'Alertas', 'Registro de sigedoc', 'Resumen']
  const [activeStep, setActiveStep] = useState(0)
  const [newIdOffice, setIdOffice] = useState(null)
  const [idProccesUpdated, setIdProccesUpdated] = useState(idProcess)

  //TODO: GUARDAR LOS REGISTROS DE DIGITAL FILES EN PROCESOS
  const [arrDigitalFiles, setArrDigitalFiles] = useState([])
  const navigate = useNavigate()
  const form = useForm()

  const {
    processInfo,
    loadingProcessInfo,
    errorProcessInfo,
    createProcess,
    loadingCreationProcess,
    getOffice,
    editProcess,
    loadingEditingProcess,
    idActivity,
  } = useRequestProcessAlerts({
    idProcess,
    idGroup,
    activeStep,
    setActiveStep,
    idProccesUpdated,
    setIdOffice,
    setIdProccesUpdated,
    navigate,
  })

  const { generateSigedoc, loadingSigedoc, updateActivity, loadingActivityUpdate } =
    useRestRequestAlerts({
      idProcess,
      idActivity,
      navigate,
      editionProccessBody,
      editProcess,
      setActiveStep,
    })

  useProcessInfoAlerts({ form, processInfo, setIdOffice })

  const { handleBack, onSubmit } = useHandleActions({
    createProcess,
    editProcess,
    setActiveStep,
    getOffice,
    bodyGenerateSIGEDOC,
    generateSigedoc,
    updateActivity,
    activeStep,
    navigate,
    newIdOffice,
    idProcess,
    form,
    arrDigitalFiles,
  })

  const modalFolder = useBoolean()

  const handleCreateFolder = () => {
    modalFolder?.handleShow()
  }

  const onError = () => {}

  const seriesForm = form?.watch('serie')
  const folderForm = form?.watch('carpeta')

  const isButtonDisabled = !seriesForm?.codigo || !!folderForm

  const formFolder = useForm({
    defaultValues: {
      autor: {
        identificacion: {
          numero: userData?.documentId ?? '',
        },
      },
      serie: { codigo: seriesForm?.codigo },
      fechaInicial: '',
      nombre: '',
    },
  })

  return (
    <>
      {loadingProcessInfo ? (
        <Loading />
      ) : errorProcessInfo ? (
        <ErrorPage />
      ) : (
        <Grid
          container
          sx={{ pt: '1px', pb: '10px' }}
        >
          <BackdropLoading
            loading={
              loadingCreationProcess ||
              loadingEditingProcess ||
              loadingSigedoc ||
              loadingActivityUpdate
            }
          />
          <Grid
            item
            xs={12}
          >
            <BasicTitle title={`Radicando proceso de envío de alertas`} />
          </Grid>
          <Grid
            container
            p={2}
            spacing={2}
            component='form'
            onSubmit={form.handleSubmit(onSubmit, onError)}
            justifyContent='space-between'
          >
            <StepperRequirements
              steps={stepsAlertsSender}
              step={activeStep}
            />
            <Grid
              item
              xs={12}
              md={9}
            >
              <Grid container>
                <Grid
                  item
                  xs={12}
                >
                  <BasicTitle title='Alertas vinculadas al proceso' />
                </Grid>
                <Grid
                  item
                  xs={12}
                  padding={6}
                  sx={{
                    maxHeight: 'calc(100vh - 220px)',
                    overflow: 'auto',
                    backgroundColor: '#f5f5f5',
                  }}
                  alignContent='flex-start'
                >
                  <Grid
                    container
                    spacing={4}
                  >
                    <FormSteps
                      form={form}
                      activeStep={activeStep}
                      ids={{
                        idGroup,
                        idProcess,
                      }}
                      processInfo={processInfo}
                      modalFolder={modalFolder}
                      formFolder={formFolder}
                    />

                    {activeStep === 2 && (
                      <AttachedDocumentsSIGEDOC
                        form={form}
                        title='Archivo Digital'
                        isProcessFiles={false}
                        isDigitalFile={true}
                        docsInformation={{ arrDoc: arrDigitalFiles, setArrDoc: setArrDigitalFiles }}
                        idProcess={idProcess}
                        isPaddingFile={true}
                        isDescriptionInput={false}
                      />
                    )}
                    <Grid
                      item
                      xs={12}
                    >
                      <Divider />
                    </Grid>

                    <ButtonsSendsAlertsForm
                      disabled={isButtonDisabled}
                      activeStep={activeStep}
                      handleBack={handleBack}
                      handleCreateFolder={handleCreateFolder}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default ViewSendsAlerts
