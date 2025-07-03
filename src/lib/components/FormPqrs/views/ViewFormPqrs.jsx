import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  AddOrEditComplainantOrAccused,
  BackdropLoading,
  BasicTitle,
  ErrorPage,
  Loading,
  useBoolean,
} from '@/lib'
import { Grid } from '@mui/material'
import { StepperRequirements } from '@/app/inbox/components'
import { useHandleActions, useRequestProcessPqrs, useRestRequestProcess } from '../hooks'
import { FormSteps } from '../components'
import { ButtonsSendsAlertsForm } from '@/app/inbox/sendsAlerts/components'

const ViewFormPqrs = ({ idGroup, idProcess }) => {
  const stepsPqrs = ['Selección de proceso', 'Datos básicos', 'Peticionarios', 'Resumen']
  const [activeStep, setActiveStep] = useState(0)
  //   const [newIdOffice, setIdOffice] = useState(null)
  const [idProccesUpdated, setIdProccesUpdated] = useState(idProcess)
  const [validationComplainant, setValidationComplainant] = useState(false)

  const navigate = useNavigate()
  const form = useForm()

  const {
    processInfo,
    loadingProcessInfo,
    errorProcessInfo,
    createProcess,
    loadingCreationProcess,
    editProcess,
    loadingEditingProcess,
    idActivity,
  } = useRequestProcessPqrs({
    idProcess,
    idGroup,
    activeStep,
    setActiveStep,
    idProccesUpdated,
    setIdProccesUpdated,
    navigate,
  })

  const { updateActivity, loadingActivityUpdate } = useRestRequestProcess({
    idProcess,
    idActivity,
    navigate,
  })

  const { handleBack, onSubmit } = useHandleActions({
    createProcess,
    editProcess,
    setActiveStep,
    updateActivity,
    activeStep,
    navigate,
    idProcess,
    validationComplainant,
  })

  const onError = () => {}

  //MODAL PETICIONARIO

  const modalOptionsFS = useBoolean()
  const [typeTable, setTypeTable] = useState()
  const formModal = useForm()
  const [rowParams, setRowParams] = useState()

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
            loading={loadingCreationProcess || loadingEditingProcess || loadingActivityUpdate}
          />
          <Grid
            item
            xs={12}
          >
            <BasicTitle title={`Radicando proceso de peticion de PQRS`} />
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
              steps={stepsPqrs}
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
                  <BasicTitle title='Peticion PQRS' />
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
                      openModal={(type) => {
                        modalOptionsFS?.handleShow()
                        setTypeTable(type)
                      }}
                      formModal={formModal}
                      setRowParams={setRowParams}
                      setValidationComplainant={setValidationComplainant}
                    />
                    <ButtonsSendsAlertsForm
                      activeStep={activeStep}
                      handleBack={handleBack}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {modalOptionsFS.show && (
              <AddOrEditComplainantOrAccused
                modalOptionsFS={modalOptionsFS}
                typeTable={typeTable}
                formModal={formModal}
                idProcess={idProcess}
                rowParams={rowParams}
              />
            )}
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default ViewFormPqrs
