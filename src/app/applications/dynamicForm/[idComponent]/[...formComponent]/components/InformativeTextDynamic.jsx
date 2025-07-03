import { Typography } from '@mui/material'

const InformativeTextDynamic = ({ text = '', variant = 'h6' }) => {
  return (
    <Typography
      variant={variant}
      sx={{ whiteSpace: 'pre-line' }}
    >
      {text.replaceAll('\\n', '\n')}
    </Typography>
  )
}

export default InformativeTextDynamic
