import { Info, GroupAdd, Folder } from '@mui/icons-material'
import { BasicData, ExecutesOptions } from '../components'
import { AddFunctionaries } from '../../../exogens/create/components'

const useInspectionPlanConstants = ({
  form,
  idInspectionPlan,
  generateProcesses,
  activeStep,
  setActiveStep,
  queueInfo,
  getInspectionPlanQueue,
  getInspectionPlanJob,
}) => {
  const steps = ['Datos Básicos', 'Vincular Funcionarios', 'Generar Expedientes']
  const title = idInspectionPlan
    ? `Edición de Fiscalización Endógena : Consecutivo ${form.getValues('identifier')}`
    : 'Creación Fiscalización Endógena'
  const backpath = '/audit/expedient/endogens'

  const icons = {
    1: <Info />,
    2: <GroupAdd />,
    3: <Folder />,
  }

  const propsStepper = {
    steps,
    activeStep,
    setActiveStep,
    icons,
  }

  const stepComponents = {
    0: (
      <BasicData
        form={form}
        idInspectionPlan={idInspectionPlan}
        queueInfo={queueInfo}
      />
    ),
    1: (
      <AddFunctionaries
        form={form}
        idInspectionPlan={idInspectionPlan}
      />
    ),
    2: (
      <ExecutesOptions
        form={form}
        generateProcesses={generateProcesses}
        idInspectionPlan={idInspectionPlan}
        queueInfo={queueInfo}
        getInspectionPlanQueue={getInspectionPlanQueue}
        getInspectionPlanJob={getInspectionPlanJob}
      />
    ),
  }

  return {
    propsStepper,
    title,
    backpath,
    stepComponents,
  }
}

export default useInspectionPlanConstants
