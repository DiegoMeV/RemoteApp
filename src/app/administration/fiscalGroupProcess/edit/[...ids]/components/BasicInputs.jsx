import { FormControlLabel, Grid, Switch, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

const BasicInputs = ({ control }) => {
  return (
    <>
      <Grid
        item
        xs={6}
        sm={5}
        xl={4}
      >
        <Controller
          name='name'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label='Nombre grupo'
              size='small'
              required
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={{ backgroundColor: 'backgroundWhite1' }}
            />
          )}
        />
      </Grid>
      <Grid
        item
        xs={6}
        sm={5}
        xl={4}
      >
        <Controller
          name='filingForm'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label='Forma radicación'
              size='small'
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={{ backgroundColor: 'backgroundWhite1' }}
            />
          )}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={2}
        xl={4}
      >
        {/* TODO <Button variant='contained'>Previsualizar</Button> */}
        <Controller
          name='isEnabled'
          control={control}
          render={({ field: { onChange, value } }) => (
            <FormControlLabel
              control={
                <Switch
                  checked={value}
                  onChange={onChange}
                />
              }
              label='Estado'
            />
          )}
        />
      </Grid>
    </>
  )
}

export default BasicInputs
