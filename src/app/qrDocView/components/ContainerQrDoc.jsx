import { Box } from '@mui/material'
import { CardDocumentError, ContentQrDoc, QrDocBasicData, QrDocSigners, TitleQrDoc } from '.'
import { containerSectionQrCode } from '../styles'
import { Loading } from '@/lib'

const ContainerQrDoc = ({ dataBasicArr, rowsSigners, commentId, loadingQrDoc, errorQrDoc }) => {
  return (
    <Box component='main'>
      <ContentQrDoc>
        <TitleQrDoc
          title='Datos del Documento'
          tag='h1'
        />
        <Box
          component='article'
          sx={containerSectionQrCode}
        >
          {loadingQrDoc && <Loading />}
          {!loadingQrDoc && errorQrDoc && (
            <CardDocumentError message={'Informacion de documento no encontrada'} />
          )}
          {!loadingQrDoc && !errorQrDoc && (
            <>
              <QrDocBasicData dataBasicArr={dataBasicArr} />
              <QrDocSigners
                rowsSigners={rowsSigners}
                commentId={commentId}
              />
            </>
          )}
        </Box>
      </ContentQrDoc>
    </Box>
  )
}

export default ContainerQrDoc
