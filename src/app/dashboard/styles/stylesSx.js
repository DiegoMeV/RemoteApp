import { alpha } from '@mui/material/styles'
import { bgGradient } from '../func'

export const summaryStyles = (color) => ({
  ...bgGradient({
    direction: '135deg',
    startColor: (theme) => alpha(theme.palette[color].light, 0.2),
    endColor: (theme) => alpha(theme.palette[color].main, 0.2),
  }),
  color: `${color}.darker`,
  backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#505050' : 'common.white'),
  alignItems: 'center',
  py: 5,
  borderRadius: 2,
  textAlign: 'center',
  boxShadow: 10,
})

export const chartContainerStyles = {
  backgroundColor: 'backgroundWhite1',
  borderRadius: '10px',
  boxShadow: 'rgba(0, 0, 0, 0.2)  0px 10px 15px 0px ',
}

export const titleStyles = {
  display: 'flex',
  alignItems: 'center',
  minHeight: '60px',
  backgroundColor: 'backgroundGrey2',
  borderRadius: '10px 10px 0 0',
  pl: '15px',
}

export const tabOptions = {
  backgroundColor: 'backgroundGrey2',
  borderRadius: '10px 10px 0 0',
  boxShadow: '0px 25px 20px -25px rgba(0,0,0,0.4)',
  maxHeight: '60px',
}
