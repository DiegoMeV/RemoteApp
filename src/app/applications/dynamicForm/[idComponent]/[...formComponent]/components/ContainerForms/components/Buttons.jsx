import { Grid } from '@mui/material'
import ButtonDynamicForm from '../../ButtonDynamicForm'

const Buttons = ({ buttonItems, dataBlock, isPending, isFormReady }) => {
  return (
    <>
      {buttonItems?.map((item) => (
        <Grid
          key={item.id}
          item
          xs={12}
          sx={{ paddingLeft: '0px !important' }}
        >
          <ButtonDynamicForm
            label={item.label}
            eventButton={item.eventButton}
            disabled={isPending || !isFormReady || dataBlock?.isReadOnly}
          >
            {item.label || 'Acción'}
          </ButtonDynamicForm>
        </Grid>
      ))}
    </>
  )
}

export default Buttons
