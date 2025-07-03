import { BasicData } from './basicData'
import { UploadDocuments } from './uploadDocuments'

const StepComponent = ({ step, form, queueInfo, setActiveStep }) => {
  const stepComponents = {
    0: (
      <BasicData
        form={form}
        queueInfo={queueInfo}
      />
    ),
    1: (
      <UploadDocuments
        form={form}
        setActiveStep={setActiveStep}
      />
    ),
  }

  return stepComponents[step] || null
}

export default StepComponent
