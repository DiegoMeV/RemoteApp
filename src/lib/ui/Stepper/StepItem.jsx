import { useTheme } from '@emotion/react'
import { Apps } from '@mui/icons-material'
import { StepLabel } from '@mui/material'

const StepItem = ({ step, colorActiveStep }) => {
  const theme = useTheme()
  const IconComponent = step?.icon || Apps

  return (
    <StepLabel
      StepIconComponent={() => (
        <IconComponent
          color={colorActiveStep}
          sx={{ fontSize: '2.5rem' }}
        />
      )}
      sx={{
        '& .MuiStepLabel-iconContainer': {
          // TO-DO: cursor: 'pointer',
        },
        '& .MuiStepLabel-label': {
          // TO-DO: cursor: 'pointer',
          color: theme.palette.secondary.main,
          fontSize: '1rem',
        },
        '& .MuiStepLabel-label.Mui-active': {
          color: theme.palette.primary.main,
          fontSize: '1rem',
        },
        '& .MuiStepLabel-label.Mui-completed': {
          color: theme.palette.primary.main,
          fontSize: '1rem',
        },
      }}
    >
      {step?.label ?? ''}
    </StepLabel>
  )
}

export default StepItem
