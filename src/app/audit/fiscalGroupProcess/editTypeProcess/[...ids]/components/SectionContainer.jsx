import { Box } from '@mui/material'

const SectionContainer = ({ children }) => {
  return (
    <Box
      width='100%'
      backgroundColor='backgroundGrey1'
      borderRadius='10px 10px 0 0'
    >
      {children}
    </Box>
  )
}

export default SectionContainer
