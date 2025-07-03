import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { BackdropLoading } from '@/libV4'
import { AttachEmail, DriveFolderUpload, Folder, Info } from '@mui/icons-material'
import { StepComponent } from './components'
import { useApisMassiveActivities, useOnSubmit } from './hooks'
import { ButtonsForm, CardContentPage, StepperAudit, TitlePage } from '@/app/audit/components'

const MassiveGuidesCreate = () => {
  const [searchParams] = useSearchParams()
  const idGuide = searchParams.get('idGuide')
  const [activeStep, setActiveStep] = useState(0)
  const [queueInfo, setQueueInfo] = useState()

  const form = useForm()

  const {
    getMassiveGuidesInfo,
    createMassiveGuide,
    editMassiveGuide,
    getInfoTemplate,
    // getMassiveActivitiesQueue,
    loadingApis,
  } = useApisMassiveActivities({ form, setActiveStep, idGuide, setQueueInfo })

  useEffect(() => {
    if (idGuide) {
      getInfoTemplate()
      getMassiveGuidesInfo({ qry: `/${idGuide}` })
      // getMassiveActivitiesQueue({ qry: `/MASSIVE_APPLY_ACTIVITY/${idGuide}` })
    }
  }, [getMassiveGuidesInfo, idGuide])

  const onSubmit = useOnSubmit({
    activeStep,
    setActiveStep,
    idGuide,
    createMassiveGuide,
    editMassiveGuide,
  })
  const steps = ['Datos Básicos', 'Carga de archivos', 'Guías de seguimiento', 'Archivos adjuntos']
  const icons = {
    1: <Info />,
    2: <DriveFolderUpload />,
    3: <Folder />,
    4: <AttachEmail />,
  }
  const propsStepper = {
    steps,
    activeStep,
    setActiveStep,
    icons,
  }
  const title = 'Creación Masiva de guías de Seguimiento'
  const backpath = '/audit/massiveManagement/guides'

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
          idGuide={idGuide}
          // getMassiveActivitiesQueue={getMassiveActivitiesQueue}
        />
        <ButtonsForm
          backPath={'/audit/massiveManagement/guides'}
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

export default MassiveGuidesCreate
