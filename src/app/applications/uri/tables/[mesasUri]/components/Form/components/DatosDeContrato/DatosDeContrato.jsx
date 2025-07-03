import { Box, Grid } from '@mui/material'

import InputsRowOne from './InputsRowOne'
import InputsRowTwo from './InputsRowTwo'
import InputsRowThree from './InputsRowThree'

import { BasicTitle } from '@/lib'
import { useEffect } from 'react'

const DatosDeContrato = ({ form, errors, dataRegistryAri }) => {
  useEffect(() => {
    form.setValue('numero_contrato', dataRegistryAri?.numero_contrato)
    form.setValue('nombre_proyecto', dataRegistryAri?.nombre_proyecto)
    form.setValue('objeto_contrato', dataRegistryAri?.objeto_contrato)
    form.setValue(
      'valor_contrato_proyecto',
      dataRegistryAri?.valor_alertado ?? dataRegistryAri?.valor_contrato_proyecto
    )
    form.setValue('valor_interventoria', dataRegistryAri?.valor_interventoria)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataRegistryAri])

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
        <BasicTitle title='Datos del contrato' />
      </Grid>
      <Grid
        container
        my='36px'
        spacing={4}
        px={4}
      >
        <InputsRowOne
          form={form}
          handleChangeSelect={handleChangeSelect}
          handleChangeNumber={handleChangeNumber}
          errors={errors}
        />
        <InputsRowTwo
          form={form}
          handleChangeNumber={handleChangeNumber}
          handleChangeSelect={handleChangeSelect}
          errors={errors}
        />

        <InputsRowThree
          form={form}
          handleChangeSelect={handleChangeSelect}
          handleChangeNumber={handleChangeNumber}
          errors={errors}
        />
      </Grid>
    </Box>
  )
}

export default DatosDeContrato
