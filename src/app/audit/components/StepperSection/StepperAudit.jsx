import { Step, StepLabel, Stepper, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import CustomStepIcon from './CustomStepIcon'
import { connectorStyles } from './styles'

const StepperAudit = ({ isEdit, steps, activeStep, setActiveStep, icons }) => {
  const [completed, setCompleted] = useState({})
  useEffect(() => {
    const newCompleted = {}
    steps.forEach((step, index) => {
      newCompleted[index] = activeStep > index
    })
    setCompleted(newCompleted)
  }, [activeStep, steps])

  const handleStep = (step) => () => {
    setActiveStep(step)
  }

  return (
    <Stepper
      nonLinear={isEdit}
      activeStep={activeStep}
      alternativeLabel
      sx={connectorStyles}
    >
      {steps.map((label, index) => (
        <Step
          key={label}
          completed={completed[index]}
        >
          <StepLabel
            onClick={isEdit ? handleStep(index) : undefined}
            StepIconComponent={CustomStepIcon}
            StepIconProps={{
              icons,
            }}
            sx={{
              cursor: isEdit ? 'pointer' : 'default',
            }}
          >
            <Typography color={activeStep === index || completed[index] ? 'primary' : 'inherit'}>
              {label}
            </Typography>
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  )
}

export default StepperAudit
