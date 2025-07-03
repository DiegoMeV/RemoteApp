import { Box, Grid } from '@mui/material'
import dayjs from 'dayjs'

import { BasicTitle } from '@/lib'
import InputsRowOne from './InputsRowOne'
import InputsRowTwo from './InputsRowTwo'

const InformacionPersonal = ({ form, requiredInput, errors, setValue, watch }) => {
  const handleChangeSelect = (name, e) => {
    form.setValue(name, e.value)
  }

  const handleDateChange = (newValue, name) => {
    const formattedDate = dayjs(newValue)
    form.setValue(name, formattedDate)
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
        <BasicTitle title='Datos básicos' />
      </Grid>
      <Box sx={{ overflow: 'hidden', padding: '20px' }}>
        <Grid
          container
          my='36px'
          spacing={4}
        >
          <InputsRowOne
            form={form}
            handleChangeSelect={handleChangeSelect}
            handleDateChange={handleDateChange}
            handleChangeNumber={handleChangeNumber}
            errors={errors}
            setValue={setValue}
            watch={watch}
          />
          <InputsRowTwo
            form={form}
            handleChangeSelect={handleChangeSelect}
            handleDateChange={handleDateChange}
            requiredInput={requiredInput}
            errors={errors}
          />
        </Grid>
      </Box>
    </Box>
  )
}

export default InformacionPersonal
