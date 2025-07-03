import { Box, Button, Grid } from '@mui/material'
import { sxButtons, sxContainer } from '../styles'
import toast from 'react-hot-toast'
import { BackdropLoading } from '@/lib'

const ContainerForm = ({ loading, onClickCancel, submitForm, children }) => {
  return (
    <>
      <BackdropLoading loading={loading} />
      <Box
        component='form'
        sx={sxContainer}
        onSubmit={submitForm}
      >
        <Grid
          container
          spacing={3}
          width={'100%'}
        >
          {children}
        </Grid>
        <Box sx={sxButtons}>
          <Button
            color='secondary'
            variant='contained'
            onClick={
              onClickCancel ||
              (() => {
                toast.error('Error al cancelar la acción.')
              })
            }
          >
            Cancelar
          </Button>
          <Button
            variant='contained'
            type='submit'
          >
            Guardar
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default ContainerForm
