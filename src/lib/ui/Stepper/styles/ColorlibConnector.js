import styled from '@emotion/styled'
import { StepConnector, stepConnectorClasses } from '@mui/material'

const ColorlibConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
    width: '50%',
    left: 'calc(-35% + 20px)',
  },
  [`&.${stepConnectorClasses.active}, &.${stepConnectorClasses.completed}`]: {
    // Combina active y completed
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: '#1976d2',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 2,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
}))

export default ColorlibConnector
