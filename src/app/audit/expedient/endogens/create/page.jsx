import { ButtonsForm, CardContentPage, StepperAudit, TitlePage } from '@/app/audit/components'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { BackdropLoading } from '@/libV4'
import { useGenerateProcesses } from '../../hooks'
import { useInspectionPlan, useInspectionPlanConstants, useOnSubmitInspectionPlan } from './hooks'
import { ModalProcessExpedient } from '../../components'

const EndogenCreate = () => {
  const [searchParams] = useSearchParams()
  const idInspectionPlan = searchParams.get('idInspectionPlan')
  const [activeStep, setActiveStep] = useState(0)
  const [modalOpen, setModalOpen] = useState(null)
  const [queueInfo, setQueueInfo] = useState()
  const form = useForm()

  const {
    getInspectionPlanInfo,
    createInspectionPlan,
    editInspectionPlan,
    getInspectionPlanQueue,
    getInspectionPlanJob,
    loadingApis,
  } = useInspectionPlan({ form, setActiveStep, setQueueInfo, idInspectionPlan })
  const { generateProcesses, isPendingGenerateProcesses } = useGenerateProcesses({
    idInspectionPlan,
    getInspectionPlanQueue,
  })

  const { propsStepper, title, backpath, stepComponents } = useInspectionPlanConstants({
    form,
    idInspectionPlan,
    generateProcesses,
    activeStep,
    setActiveStep,
    queueInfo,
    getInspectionPlanQueue,
    getInspectionPlanJob,
  })

  const onSubmit = useOnSubmitInspectionPlan({
    activeStep,
    idInspectionPlan,
    createInspectionPlan,
    editInspectionPlan,
    setActiveStep,
    setModalOpen,
  })

  useEffect(() => {
    if (idInspectionPlan) {
      getInspectionPlanInfo({ qry: `/${idInspectionPlan}?includeTemplate=true` })
      getInspectionPlanQueue({ qry: `/INSPECTION_CREATE_PROCESS/${idInspectionPlan}` })
      getInspectionPlanQueue({ qry: `/EXCEL_SUBJECT_GEN/${idInspectionPlan}` })
      getInspectionPlanJob()
    }
  }, [getInspectionPlanInfo, getInspectionPlanJob, getInspectionPlanQueue, idInspectionPlan])

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <TitlePage
          title={title}
          backpath={backpath}
        />
        <BackdropLoading loading={loadingApis || isPendingGenerateProcesses} />
        <CardContentPage>
          <StepperAudit {...propsStepper} />
          {stepComponents[activeStep]}
          <ButtonsForm
            backPath={'/audit/expedient/endogens'}
            endStep={2}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            queueStatus={queueInfo?.[0]?.status || queueInfo?.[0]?.estado}
          />
        </CardContentPage>
      </form>
      {modalOpen && (
        <ModalProcessExpedient
          idInspectionPlan={idInspectionPlan}
          openModal={modalOpen}
          handleClose={() => setModalOpen(false)}
          title='Procesos'
        />
      )}
    </>
  )
}

export default EndogenCreate
