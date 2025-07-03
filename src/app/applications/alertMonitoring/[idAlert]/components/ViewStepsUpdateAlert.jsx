import { Box } from '@mui/material'
import { BasicDataInputs } from './basicDataAlert'
import { sxContainer } from '@/app/applications/styles'
import { OperationsContainer } from './operations'

const ViewStepsUpdateAlert = ({
  control,
  idAlert
}) => {
  return (
    <Box
      sx={sxContainer}
      component='article'
    >
      <BasicDataInputs
        control={control}
      />
      <OperationsContainer idAlert={idAlert}/>
    </Box>
  )
}

export default ViewStepsUpdateAlert
