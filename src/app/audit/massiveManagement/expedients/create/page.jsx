import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { BackdropLoading } from '@/libV4'
import { AttachEmail, DriveFolderUpload, Folder, Info, Summarize } from '@mui/icons-material'
import { StepComponent } from './components'
import { useApisMassiveActivities, useOnSubmit } from './hooks'
import { ButtonsForm, CardContentPage, StepperAudit, TitlePage } from '@/app/audit/components'

const MassiveExpedientsCreate = () => {
  const [searchParams] = useSearchParams()
  const idMassiveActivity = searchParams.get('idMassiveActivity')
  const [activeStep, setActiveStep] = useState(0)
  const [queueInfo, setQueueInfo] = useState()

  const form = useForm({ defaultValues: { statusExpedients: 'ALL' } })

  const {
    getMassiveActivityInfo,
    getInfoTemplate,
    createMassiveActivity,
    editMassiveActivity,
    getMassiveActivitiesQueue,
    loadingApis,
  } = useApisMassiveActivities({ form, setActiveStep, idMassiveActivity, setQueueInfo })

  useEffect(() => {
    if (idMassiveActivity) {
      getInfoTemplate()
      getMassiveActivityInfo({ qry: `/${idMassiveActivity}` })
      getMassiveActivitiesQueue({ qry: `/MASSIVE_APPLY_ACTIVITY/${idMassiveActivity}` })
      getMassiveActivitiesQueue({ qry: `/MASSIVE_GEN_ZIP/${idMassiveActivity}` })
    }
  }, [getInfoTemplate, getMassiveActivitiesQueue, getMassiveActivityInfo, idMassiveActivity])

  const onSubmit = useOnSubmit({
    activeStep,
    setActiveStep,
    idMassiveActivity,
    createMassiveActivity,
    editMassiveActivity,
  })
  const steps = [
    'Datos Básicos',
    'Carga de archivos',
    'Expedientes afectados',
    'Archivos adjuntos',
    'Aplicar y/o generar informes',
  ]
  const icons = {
    1: <Info />,
    2: <DriveFolderUpload />,
    3: <Folder />,
    4: <AttachEmail />,
    5: <Summarize />,
  }
  const propsStepper = {
    steps,
    activeStep,
    setActiveStep,
    icons,
  }
  const title = 'Creación Actividad Masiva'
  const backpath = '/audit/massiveManagement/expedients'

  return (
    <Box
      component='form'
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <TitlePage
        title={title}
        backpath={backpath}
      />
      <CardContentPage>
        <StepperAudit {...propsStepper} />
        <BackdropLoading loading={loadingApis} />
        <BackdropLoading loading={false} />
        <StepComponent
          step={activeStep}
          form={form}
          queueInfo={queueInfo}
          setActiveStep={setActiveStep}
          idMassiveActivity={idMassiveActivity}
          getMassiveActivitiesQueue={getMassiveActivitiesQueue}
        />
        <ButtonsForm
          backPath={'/audit/massiveManagement/expedients'}
          endStep={4}
          hideButton={5}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          queueStatus={queueInfo?.[0]?.status}
        />
      </CardContentPage>
    </Box>
  )
}

export default MassiveExpedientsCreate
