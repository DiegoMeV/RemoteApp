import { ClassicIconButton } from '@/lib'
import { Delete, Save } from '@mui/icons-material'
import { Button, CircularProgress, Grid } from '@mui/material'
import TextfieldAssignment from './TextfieldAssignment'

const ItemOptions = ({ handleRemoveForm, formData, control, disabledButton, deleteLoading }) => {
  return (
    <>
      <Grid
        item
        xs={12}
        md={1}
        display='flex'
        justifyContent='center'
      >
        <ClassicIconButton
          color='secondary'
          onClick={() => handleRemoveForm(formData)}
          hoverColor={'red'}
        >
          {deleteLoading ? <CircularProgress /> : <Delete />}
        </ClassicIconButton>
      </Grid>
      <TextfieldAssignment
        label='Observaciones'
        name={`observation`}
        control={control}
        multiline
      />
      <Grid
        item
        container
        xs={12}
        justifyContent='flex-end'
      >
        <Button
          variant='contained'
          type='submit'
          startIcon={<Save />}
          disabled={disabledButton || !!formData.idUserJobTitle}
        >
          Guardar
        </Button>
      </Grid>
    </>
  )
}

export default ItemOptions
