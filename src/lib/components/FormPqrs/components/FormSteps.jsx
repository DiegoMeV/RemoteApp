import { StepOne, StepSummary, StepThree, StepTwo } from '.'

const FormSteps = ({
  activeStep,
  form,
  ids,
  processInfo,
  openModal,
  formModal,
  setRowParams,
  setValidationComplainant,
}) => {
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
      step={activeStep}
      ids={ids}
      form={form}
      openModal={openModal}
      formModal={formModal}
      setRowParams={setRowParams}
      setValidationComplainant={setValidationComplainant}
    />,
    <StepSummary
      key={3}
      ids={ids}
      processInfo={processInfo}
    />,
  ]
  return stepsRender[activeStep]
}

export default FormSteps
