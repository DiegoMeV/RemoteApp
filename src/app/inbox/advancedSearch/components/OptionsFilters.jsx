import { ClassicIconButton } from '@/lib'
import { AddCircle } from '@mui/icons-material'
import { Button, Grid } from '@mui/material'
import { useStoreActions } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'

const OptionsFilters = ({ addFilter }) => {
  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )
  const cancelFilter = () => {
    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      content: `¿Esta seguro de cancelar la búsqueda?`,
      onConfirm: () => {
        navigate('/inbox')
      },
    })
  }
  const navigate = useNavigate()
  return (
    <>
      <Grid
        item
        xs={12}
        display='flex'
        justifyContent='flex-end'
      >
        <ClassicIconButton onClick={addFilter}>
          <AddCircle color='secondary' />
        </ClassicIconButton>
      </Grid>
      <Grid
        item
        xs={12}
        display='flex'
        justifyContent='flex-end'
        columnGap={2}
      >
        <Button
          variant='contained'
          color='secondary'
          onClick={cancelFilter}
        >
          Cancelar
        </Button>
        <Button
          variant='contained'
          type='submit'
        >
          Buscar
        </Button>
      </Grid>
    </>
  )
}

export default OptionsFilters
