import { AccessControl } from '@/libV4'
import { Troubleshoot } from '@mui/icons-material'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const AdvancedSearchButton = () => {
  const navigate = useNavigate()
  return (
    <AccessControl privilege='procesos.bandeja.busqueda_avanzada'>
      <Button
        variant='contained'
        startIcon={<Troubleshoot />}
        color='primary'
        fullWidth
        sx={{ minWidth: '200px' }}
        onClick={() => navigate('/inbox/advancedSearch')}
      >
        Búsqueda Avanzada
      </Button>
    </AccessControl>
  )
}

export default AdvancedSearchButton
