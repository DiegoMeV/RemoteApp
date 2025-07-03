import { Box, Grid } from '@mui/material'
import dayjs from 'dayjs'
import InputsRowOne from './InputsRowOne'
import InputsRowTwo from './InputsRowTwo'
import { BasicTitle } from '@/lib'

const Actuaciones = ({ form }) => {
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
        <BasicTitle title='Actuaciones' />
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
          />
          <InputsRowTwo
            form={form}
            handleChangeSelect={handleChangeSelect}
            handleDateChange={handleDateChange}
          />
        </Grid>
      </Box>
    </Box>
  )
}

export default Actuaciones
