import { Button, FormControlLabel, Grid, Switch, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

const BasicInputs = ({ control }) => {
  return (
    <>
      <Grid
        item
        xs={11}
        md={5}
        lg={4}
        xl={3}
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
        container
        justifyContent='flex-end'
        alignItems='center'
        columnGap='20px'
        paddingRight='20px'
        xs={12}
        lg={3}
        xl={5}
      >
        <Button variant='contained'>Previsualizar</Button>

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
