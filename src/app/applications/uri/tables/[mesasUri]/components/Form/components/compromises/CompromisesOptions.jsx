import { ClassicIconButton } from '@/lib'
import { Delete, Save } from '@mui/icons-material'
import { Box, Grid } from '@mui/material'

const CompromisesOptions = ({ compromise, handleDelete, onSubmit }) => {
  return (
    <Grid item>
      <Box
        display='flex'
        justifyContent='flex-end'
        width='100%'
      >
        <ClassicIconButton
          title={'Guardar'}
          onClick={() => onSubmit()}
        >
          <Save />
        </ClassicIconButton>
        {compromise.isNew && (
          <ClassicIconButton
            title={'Borrar'}
            color='error'
            onClick={handleDelete}
          >
            <Delete />
          </ClassicIconButton>
        )}
      </Box>
    </Grid>
  )
}

export default CompromisesOptions
