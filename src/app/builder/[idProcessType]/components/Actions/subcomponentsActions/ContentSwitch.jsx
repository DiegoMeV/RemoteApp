import { SwitchInput } from '@/lib'
import { Box } from '@mui/material'
import { isEnabledItem, isRequiredItem } from '../constants'

const ContentSwitch = ({ control }) => {
  return (
    <Box
      display='flex'
      flexWrap={{ xs: 'wrap', md: 'nowrap' }}
    >
      <SwitchInput
        item={isRequiredItem}
        control={control}
      />
      <SwitchInput
        item={isEnabledItem}
        control={control}
      />
    </Box>
  )
}

export default ContentSwitch
