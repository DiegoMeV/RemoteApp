import { Box, Button } from '@mui/material'

const OptionsGeneralReview = ({ handleReviewModal }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end', // Alinea el contenido a la derecha
        p: 1,
        gap: 2,
      }}
    >
      {/* <Button
        variant='contained'
        sx={{ visibility: recepción_revisión_alerta ? 'hidden' : 'visible' }}
        onClick={() => modalForm.handleShow()}
      >
        Editar datos radicación
      </Button> */}

      <Box
        display='flex'
        columnGap={2}
      >
        <Button
          variant='contained'
          onClick={() => handleReviewModal('APPROVED')}
        >
          Aprobar
        </Button>
        <Button
          variant='contained'
          color='error'
          onClick={() => handleReviewModal('REJECTED')}
        >
          Rechazar
        </Button>
      </Box>
    </Box>
  )
}

export default OptionsGeneralReview
