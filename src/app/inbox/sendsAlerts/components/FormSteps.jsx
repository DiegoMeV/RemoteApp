import StepOne from './StepOne'
import StepThree from './StepThree'
import StepThreeSummary from './StepThreeSummary'
import StepTwo from './StepTwo'

const FormSteps = ({ activeStep, form, ids, processInfo, modalFolder, formFolder }) => {
  const stepsRender = [
    <StepOne
      key={0}
      form={form}
      ids={ids}
    />,
    <StepTwo
      key={1}
      form={form}
      ids={ids}
    />,
    <StepThree
      key={2}
      ids={ids}
      form={form}
      modalFolder={modalFolder}
      formFolder={formFolder}
    />,
    <StepThreeSummary
      key={3}
      ids={ids}
      processInfo={processInfo}
    />,
  ]
  return stepsRender[activeStep]
}

export default FormSteps
