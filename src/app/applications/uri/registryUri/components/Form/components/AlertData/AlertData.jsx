import { Box, Grid } from '@mui/material'
import dayjs from 'dayjs'

import InputsRowOne from './InputsRowOne'
import InputsRowTwo from './InputsRowTwo'
import InputsRowThree from './InputsRowThree'
import InputsRowOther from './InputsRowOther'
import { BasicTitle } from '@/lib'
import InputsRowFour from './InputsRowFour'
import InputsRowFive from './InputsRowFive'
import InputsRowSix from './InputsRowSix'
import InputsRowSeven from './InputsRowSeven'
import InputsRowEight from './InputsRowEight'
import { useEffect } from 'react'

const AlertData = ({ form }) => {
  const handleChangeSelect = (name, e) => {
    form.setValue(name, e.value)
  }
  const valueAlert = form.watch('valor_alertado')
  const valueInterventoria = form.watch('valor_interventoria')
  const valueComplementario = form.watch('valor_complementario')
  useEffect(() => {
    let alert = Number(valueAlert)
    if (isNaN(alert)) {
      alert = 0
    }
    let interventoria = Number(valueInterventoria)
    if (isNaN(interventoria)) {
      interventoria = 0
    }
    let complementario = Number(valueComplementario)
    if (isNaN(complementario)) {
      complementario = 0
    }
    const total = alert + interventoria + complementario
    form.setValue('valor_proyecto', total)
  }, [form, valueAlert, valueComplementario, valueInterventoria])

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
        <BasicTitle title='Datos de alerta' />
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
          />
          <InputsRowTwo
            form={form}
            handleChangeNumber={handleChangeNumber}
          />
          <InputsRowThree
            form={form}
            handleChangeNumber={handleChangeNumber}
          />
          <InputsRowOther
            form={form}
            handleChangeNumber={handleChangeNumber}
          />
          <InputsRowFour
            form={form}
            handleChangeNumber={handleChangeNumber}
            handleChangeSelect={handleChangeSelect}
          />
          <InputsRowFive
            form={form}
            handleChangeNumber={handleChangeNumber}
            handleChangeSelect={handleChangeSelect}
          />
          <InputsRowSix
            form={form}
            handleChangeNumber={handleChangeNumber}
          />
          <InputsRowSeven
            form={form}
            handleChangeNumber={handleChangeNumber}
            handleChangeSelect={handleChangeSelect}
          />
          <InputsRowEight
            form={form}
            handleDateChange={handleDateChange}
            handleChangeSelect={handleChangeSelect}
          />
        </Grid>
      </Box>
    </Box>
  )
}

export default AlertData
