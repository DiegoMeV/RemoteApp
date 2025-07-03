import { Box, Grid } from '@mui/material'
import dayjs from 'dayjs'

import GeneralInfoForm from './GeneralInfoForm'
import AdditionalDetailsForm from './AdditionalDetailsForm'
import { BasicTitle } from '@/lib'

const BasicData = ({ form, requiredInput }) => {
  const handleChangeSelect = (name, e) => {
    form.setValue(name, e?.value)
  }

  const handleDateChange = (newValue, name) => {
    const formattedDate = dayjs(newValue)
    form.setValue(name, formattedDate)
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
          <GeneralInfoForm
            form={form}
            handleChangeSelect={handleChangeSelect}
            requiredInput={requiredInput}
          />
          <AdditionalDetailsForm
            form={form}
            handleChangeSelect={handleChangeSelect}
            handleDateChange={handleDateChange}
            requiredInput={requiredInput}
          />
        </Grid>
      </Box>
    </Box>
  )
}

export default BasicData
