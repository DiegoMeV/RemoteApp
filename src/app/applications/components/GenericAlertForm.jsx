import { Box, Button, Grid } from '@mui/material'
import { sxButtons, sxContainer } from '../styles'
import toast from 'react-hot-toast'
import { ChooseInput } from '@/lib'

const GenericAlertForm = ({ inputs, control, submitForm, onClickCancel, setValue }) => {
  return (
    <Box
      component='form'
      sx={sxContainer}
      onSubmit={submitForm}
    >
      <Grid
        container
        spacing={4}
        width={'100%'}
      >
        {inputs?.map((item, index) => {
          return (
            <ChooseInput
              item={item}
              setValue={setValue}
              control={control}
              key={index}
            />
          )
        })}
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
  )
}

export default GenericAlertForm
