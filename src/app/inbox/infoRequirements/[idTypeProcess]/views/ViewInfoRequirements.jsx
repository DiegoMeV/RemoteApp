import { Box } from '@mui/material'
import { FormInfoRequirements } from '../components'

const ViewInfoRequirements = ({ idTypeProcess }) => {
  return (
    <Box component='main'>
      <FormInfoRequirements idTypeProcess={idTypeProcess} />
    </Box>
  )
}

export default ViewInfoRequirements
