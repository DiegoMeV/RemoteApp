import { Box, Typography } from '@mui/material'
import { ClassicIconButton } from '../buttons'
import { ArrowBack } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const BasicTitle = ({ title, backpath, button, className, children, titleProps, ...props }) => {
  const navigate = useNavigate()

  return (
    <Box
      className={`flex backgroundGray2 p-2 h-12 rounded-t-lg w-full items-center ${
        className ?? ''
      }`}
      {...props}
    >
      <div className='flex items-center'>
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
          alignContent='center'
          color='primary'
          {...titleProps}
        >
          {title ?? ''}
        </Typography>
      </div>
      {button && (
        <ClassicIconButton
          title={button.title}
          onClick={(e) => {
            button.onClick(e)
          }}
        >
          {button.icon}
        </ClassicIconButton>
      )}
      {children}
    </Box>
  )
}

export default BasicTitle
