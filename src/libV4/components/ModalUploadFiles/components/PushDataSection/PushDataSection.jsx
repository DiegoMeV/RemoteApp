import { Box, CircularProgress, Typography } from '@mui/material'
import InfoData from '../InfoData'
import { CancelOutlined, CheckCircle } from '@mui/icons-material'

const PushDataSection = ({ errors, loading }) => {
  return (
    <Box
      bgcolor='#fff'
      p={2}
      minHeight='20vh'
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      {loading ? (
        <CircularProgress />
      ) : errors.length ? (
        <Box
          display='flex'
          flexDirection='column'
          width='100%'
          height='100%'
        >
          <InfoData
            color={'#828282'}
            bgcolor={'#FFEAEA'}
          >
            <CancelOutlined />
            <Typography>
              <strong>¡Error!</strong> {errors[0].message}
            </Typography>
          </InfoData>
        </Box>
      ) : (
        <InfoData
          color='#828282'
          bgcolor='#EDF7EE'
        >
          <CheckCircle />
          <Typography>
            <strong>¡Confirmado!</strong> Se cargo correctamente el archivo de ingresos obtenidos de
            Presentación de actividad masiva.
          </Typography>
        </InfoData>
      )}
    </Box>
  )
}

export default PushDataSection
