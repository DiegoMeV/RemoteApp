import { Button, Grid, TextField, Typography } from '@mui/material'
import ContainerInfo from './ContainerInfo'
import { Controller } from 'react-hook-form'

const UploadFile = ({ form }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file && file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      event.target.value = null // Reset the file input
      form.setValue('fileName', null) // Reset the file in the form
    } else if (file) {
      form.setValue('file', file) // Set the file in the form
      form.setValue('fileName', file.name) // Set the file name in the form
    }
  }

  return (
    <ContainerInfo title={'Selección de archivo'}>
      <Grid
        item
        xs={9}
      >
        <Typography color='primary'>Cargue archivo actividad masiva</Typography>
      </Grid>
      <Grid
        item
        xs={9}
      >
        <Controller
          name='fileName'
          control={form.control}
          rules={{
            required:
              'Este campo es obligatorio y debe ser un archivo en formato Microsoft Excel 2007 o superior.',
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              label='Seleccione el archivo a cargar'
              value={field.value || ''}
              variant='outlined'
              size='small'
              required
              fullWidth
              disabled
              InputProps={{
                readOnly: true,
              }}
              error={!!error}
              helperText={
                error
                  ? error.message
                  : 'Solo se admiten archivos en formato Microsoft Excel 2007 o superior.'
              }
            />
          )}
        />
      </Grid>
      <Grid
        item
        xs={3}
      >
        <Button
          variant='contained'
          component='label'
          fullWidth
        >
          CARGAR ARCHIVO
          <input
            type='file'
            accept='.xlsx'
            hidden
            onChange={handleFileChange}
          />
        </Button>
      </Grid>
    </ContainerInfo>
  )
}

export default UploadFile
