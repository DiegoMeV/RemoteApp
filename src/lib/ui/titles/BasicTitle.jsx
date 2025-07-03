import { ClassicIconButton } from '@/lib'
import { ArrowBack } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import { containerTitle } from './styles'
import { useNavigate } from 'react-router-dom'

const BasicTitle = ({
  title,
  backpath,
  titleStyles = {},
  children,
  className,
  typographyProps = {},
}) => {
  const navigate = useNavigate()
  return (
    <Box
      className={className ?? ''}
      sx={{ ...containerTitle, ...titleStyles }}
    >
      {backpath && (
        <ClassicIconButton
          title='Regresar'
          onClick={() => navigate(backpath)}
        >
          <ArrowBack />
        </ClassicIconButton>
      )}
      <Typography
        variant='h5'
        textAlign='start'
        color='primary'
        {...typographyProps}
      >
        {title}
      </Typography>
      {children}
    </Box>
  )
}

export default BasicTitle
