import { Box, Grid } from '@mui/material'

import InputsRowOne from './InputsRowOne'
import InputsRowTwo from './InputsRowTwo'

import { BasicTitle } from '@/lib'

const ActualizacionContrato = ({ form }) => {
  const handleChangeSelect = (name, e) => {
    form.setValue(name, e.value)
  }

  const handleChangeNumber = (value, name, type) => {
    let newValue = value
    if (type === 'number' && !isNaN(value)) {
      newValue = Number(value)
    }

    form.setValue(name, newValue)
  }
  return (
    <Box>
      <Grid
        item
        xs={12}
      >
        <BasicTitle title='Actualización del contrato' />
      </Grid>
      <Grid
        container
        my='36px'
        spacing={4}
      >
        <InputsRowOne
          form={form}
          handleChangeSelect={handleChangeSelect}
          handleChangeNumber={handleChangeNumber}
        />
        <InputsRowTwo
          form={form}
          handleChangeNumber={handleChangeNumber}
          handleChangeSelect={handleChangeSelect}
        />
      </Grid>
    </Box>
  )
}

export default ActualizacionContrato
