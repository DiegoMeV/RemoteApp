import { ButtonsForm, CardContentPage, TitlePage } from '@/app/audit/components'
import { useEffect, useState } from 'react'
import {
  AddFunctionaries,
  BasicData,
  GenerateExpedient,
  StepperAuditComponent,
  TableViewDocument,
  UploadDocuments,
} from './components'
import { useForm } from 'react-hook-form'
import { Box } from '@mui/material'
import { BackdropLoading } from '@/lib'
import { useSearchParams } from 'react-router-dom'
import { submitForm, useApis } from './funcs'
import { useGenerateProcesses } from '../../hooks'
import toast from 'react-hot-toast'
import { ModalProcessExpedient } from '../../components'

const ExogenCreate = () => {
  const [searchParams] = useSearchParams()
  const form = useForm()
  const idInspectionPlan = searchParams.get('idInspectionPlan')
  const [modalOpen, setModalOpen] = useState(null)
  const [activeStep, setActiveStep] = useState(0)
  const [queueInfo, setQueueInfo] = useState()

  const {
    getInspectionPlanInfo,
    createInspectionPlan,
    editInspectionPlan,
    getInspectionPlanQueue,
    loadingApis,
  } = useApis({ form, setActiveStep, setQueueInfo, idInspectionPlan })

  useEffect(() => {
    if (idInspectionPlan) {
      getInspectionPlanInfo({ qry: `/${idInspectionPlan}?includeTemplate=true` })
      getInspectionPlanQueue({ qry: `/INSPECTION_CREATE_PROCESS/${idInspectionPlan}` })
    }
  }, [getInspectionPlanInfo, idInspectionPlan])
  const { generateProcesses, isPendingGenerateProcesses, isSuccess, isError } =
    useGenerateProcesses({
      idInspectionPlan,
      getInspectionPlanQueue,
    })
  useEffect(() => {
    if (isSuccess) {
      setActiveStep(4)
    }
  }, [isSuccess])
  useEffect(() => {
    if (isError) {
      toast.error('Error al generar el expediente. Por favor, inténtelo de nuevo más tarde.')
    }
  }, [isError])
  const { onSubmit } = submitForm({
    activeStep,
    setActiveStep,
    idInspectionPlan,
    createInspectionPlan,
    editInspectionPlan,
    generateProcesses,
    setModalOpen,
  })
  const title = idInspectionPlan
    ? `Edición de Fiscalización Exógena : Consecutivo ${form.getValues('identifier')}`
    : 'Creación Fiscalización Exógena'
  const backpath = '/audit/expedient/exogens'

  const stepComponents = {
    0: (
      <BasicData
        form={form}
        queueInfo={queueInfo}
      />
    ),
    1: (
      <AddFunctionaries
        idInspectionPlan={idInspectionPlan}
        form={form}
      />
    ),
    2: (
      <UploadDocuments
        form={form}
        setActiveStep={setActiveStep}
      />
    ),
    3: <TableViewDocument form={form} />,
    4: <GenerateExpedient queueInfo={queueInfo} />,
  }

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
        <StepperAuditComponent
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
        <BackdropLoading loading={loadingApis || isPendingGenerateProcesses} />
        {stepComponents[activeStep]}
        <ButtonsForm
          backPath={'/audit/expedient/exogens'}
          endStep={4}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          queueStatus={queueInfo?.[0]?.status}
        />
        {modalOpen && (
          <ModalProcessExpedient
            idInspectionPlan={idInspectionPlan}
            openModal={modalOpen}
            handleClose={() => setModalOpen(false)}
            title='Procesos'
          />
        )}
      </CardContentPage>
    </Box>
  )
}

export default ExogenCreate
