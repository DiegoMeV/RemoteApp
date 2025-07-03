import { ItemQrData, TitleQrDoc } from '.'
import { Box } from '@mui/material'
import { containerBasicDataQrCode } from '../styles'

const QrDocBasicData = ({ dataBasicArr }) => {
  return (
    <Box component='section'>
      <TitleQrDoc
        title='Datos basicos'
        fontSize='18px'
      />
      <Box
        component='article'
        sx={containerBasicDataQrCode}
      >
        {dataBasicArr.map((data, index) => (
          <ItemQrData
            key={index}
            data={data}
          />
        ))}
      </Box>
    </Box>
  )
}

export default QrDocBasicData
