import { Box } from '@mui/material'

export const ColumnBox = ({ children, width }) => (
  <Box
    width={width}
    display='flex'
    justifyContent='center'
    pr={1}
  >
    {children}
  </Box>
)
