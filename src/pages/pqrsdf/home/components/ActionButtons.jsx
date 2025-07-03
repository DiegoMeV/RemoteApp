import { Box, Button, Typography } from '@mui/material'
import { Check, Edit, Search } from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'

const ActionButtons = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const actions = [
    {
      labelTop: 'RADIQUE SU',
      labelBottom: 'PQRSDF',
      icon: <Edit fontSize='large' />,
      onClick: () => navigate(`/pqrsdf/${id}/registry`),
    },
    {
      labelTop: 'CONSULTE EL ',
      labelBottom: 'ESTADO DE SU SOLICITUD',
      icon: <Search fontSize='large' />,
      onClick: () => navigate(`/pqrsdf/${id}/inquiry`),
    },
    {
      labelTop: 'RESPUESTAS A',
      labelBottom: 'PQRSDF',
      icon: <Check fontSize='large' />,
      onClick: () => navigate(`/pqrsdf/${id}/response`),
    },
  ]
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
      {actions.map((action, index) => (
        <Button
          key={index}
          onClick={action.onClick}
          className='flex shadow-md rounded-lg hover:shadow-lg transition '
          sx={{ px: 4, py: 2, minWidth: '300px' }}
        >
          <Box
            className='rounded-full w-12 h-12 flex items-center justify-center text-white'
            bgcolor='primary.main'
          >
            {action.icon}
          </Box>
          <div className='text-left m-5 w-[108px]'>
            <Typography
              fontSize='14px'
              color='secondary.main'
            >
              {action.labelTop}
            </Typography>
            <Typography
              variant='customSubtitle'
              fontSize='14px'
              fontWeight={600}
            >
              {action.labelBottom}
            </Typography>
          </div>
        </Button>
      ))}
    </div>
  )
}

export default ActionButtons
