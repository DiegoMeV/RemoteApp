import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const ButtonsForm = ({
  handleBack = (func) => {
    func()
  },
}) => {
  const navigate = useNavigate()

  const redirectToAlertsPage = () => {
    navigate(`/applications/alerts`)
  }

  return (
    <Box
      display='flex'
      justifyContent='flex-end'
      padding='20px'
      gap='10px'
    >
      <Button
        type='button'
        variant='contained'
        color='secondary'
        onClick={() => {
          handleBack(redirectToAlertsPage)
        }}
      >
        Cancelar
      </Button>
      <Button
        type='submit'
        variant='contained'
        color='primary'
      >
        Guardar
      </Button>
    </Box>
  )
}

export default ButtonsForm
