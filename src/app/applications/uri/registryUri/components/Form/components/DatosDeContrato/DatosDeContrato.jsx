import { Box, Grid } from '@mui/material'
import dayjs from 'dayjs'

import InputsRowOne from './InputsRowOne'
import InputsRowTwo from './InputsRowTwo'
import InputsRowThree from './InputsRowThree'
import InputsRowFour from './InputsRowFour'
import InputsRowOther from './InputsRowOther'
import { BasicTitle } from '@/lib'

const DatosDeContrato = ({ form }) => {
  const handleChangeSelect = (name, e) => {
    form.setValue(name, e.value)
  }

  const handleDateChange = (newValue, name) => {
    const formattedDate = dayjs(newValue).format('YYYY-MM-DD')
    form.setValue(name, formattedDate)
  }
  return (
    <Box>
      <Grid
        item
        xs={12}
      >
        <BasicTitle title='Datos del contrato' />
      </Grid>
      <Grid
        container
        my='36px'
        spacing={4}
      >
        <InputsRowOne
          form={form}
          handleChangeSelect={handleChangeSelect}
        />
        <InputsRowTwo
          form={form}
          handleChangeSelect={handleChangeSelect}
        />
        <InputsRowThree
          form={form}
          handleChangeSelect={handleChangeSelect}
        />
        <InputsRowFour
          form={form}
          handleChangeSelect={handleChangeSelect}
        />
        <InputsRowOther
          form={form}
          handleDateChange={handleDateChange}
        />
      </Grid>
    </Box>
  )
}

export default DatosDeContrato
