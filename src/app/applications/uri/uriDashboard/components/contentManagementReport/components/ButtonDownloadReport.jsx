import { Box, Button } from '@mui/material'
import { handleDownloadReport } from '../funcs/downloadFunc'

const ButtonDownloadReport = ({ getBufferReport, infoRow, coordinates }) => {
  return (
    <Box
      p={1}
      display='flex'
      justifyContent='flex-end'
    >
      <Button
        variant='contained'
        onClick={() => handleDownloadReport(getBufferReport, infoRow, coordinates)}
      >
        Descargar informe
      </Button>
    </Box>
  )
}

export default ButtonDownloadReport
