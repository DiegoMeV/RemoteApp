import { ArrowBack } from '@mui/icons-material'
import { Box, Button, IconButton, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const TitlePage = ({ title, backpath, button, children }) => {
  const navigate = useNavigate()
  return (
    <Box
      bgcolor='backgroundGrey2'
      borderRadius='20px 20px 0 0'
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      padding={2}
    >
      <Box
        display='flex'
        alignItems='center'
      >
        {backpath && (
          <IconButton
            color='primary'
            onClick={() => navigate(backpath)}
          >
            <ArrowBack />
          </IconButton>
        )}

        <Typography
          variant='h6'
          color='primary'
        >
          {title}
        </Typography>
      </Box>
      {button && (
        <Button
          variant='contained'
          color='primary'
          {...button.props}
        >
          {button.label}
        </Button>
      )}
      {children}
    </Box>
  )
}

export default TitlePage
