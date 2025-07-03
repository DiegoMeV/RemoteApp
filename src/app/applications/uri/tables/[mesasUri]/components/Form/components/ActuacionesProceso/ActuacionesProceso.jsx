import { Box, Grid } from '@mui/material'
import dayjs from 'dayjs'
import InputsRowOne from './InputsRowOne'
import { BasicTitle } from '@/lib'
import InputsRowTwo from './InputsRowTwo'
import { useEffect } from 'react'

const ActuacionesProceso = ({ form, errors, dataRegistryAri }) => {
  useEffect(() => {
    const dateRegistryAriValue =
      dataRegistryAri?.fecha_act_finan_proyecto ?? dataRegistryAri?.fecha_actual_finalizacion

    form.setValue('fecha_act_finan_proyecto', dateRegistryAriValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataRegistryAri])

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
        <BasicTitle title='Actuación al proceso' />
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
            handleChangeNumber={handleChangeNumber}
            handleDateChange={handleDateChange}
          />
          <InputsRowTwo
            form={form}
            handleChangeSelect={handleChangeSelect}
            handleDateChange={handleDateChange}
            handleChangeNumber={handleChangeNumber}
            errors={errors}
          />
        </Grid>
      </Box>
    </Box>
  )
}

export default ActuacionesProceso
