import { StepperAudit } from '@/app/audit/components'
import { DriveFolderUpload, Folder, GroupAdd, Info, Visibility } from '@mui/icons-material'

const StepperAuditComponent = ({ activeStep, setActiveStep }) => {
  const steps = [
    'Datos Básicos',
    'Vincular Funcionarios',
    'Carga de archivos',
    'Visualizar datos',
    'Generar Expedientes',
  ]
  const icons = {
    1: <Info />,
    2: <GroupAdd />,
    3: <DriveFolderUpload />,
    4: <Visibility />,
    5: <Folder />,
  }
  const propsStepper = {
    steps,
    activeStep,
    setActiveStep,
    icons,
  }

  return <StepperAudit {...propsStepper} />
}

export default StepperAuditComponent
