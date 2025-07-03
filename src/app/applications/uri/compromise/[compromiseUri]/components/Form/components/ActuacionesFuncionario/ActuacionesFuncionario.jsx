import { Box, Grid } from '@mui/material'
import { BasicTitle } from '@/lib'
import InputsRowOne from './InputsRowOne'
import InputsRowTwo from './InputsRowTwo'

const ActuacionesFuncionario = ({ form }) => {
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
        <BasicTitle title='Actuación  de funcionario' />
      </Grid>
      <Box sx={{ overflow: 'hidden', padding: '20px' }}>
        <Grid
          container
          my='36px'
          spacing={4}
        >
          <InputsRowOne
            form={form}
            handleChangeNumber={handleChangeNumber}
          />
          <InputsRowTwo
            form={form}
            handleChangeNumber={handleChangeNumber}
          />
        </Grid>
      </Box>
    </Box>
  )
}

export default ActuacionesFuncionario
