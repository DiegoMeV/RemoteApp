import { Box } from '@mui/material'
import { ContainerQrDoc, NavbarQrDocView } from '../components'
import { toArray } from '@/lib'
import { getBasicData } from '../funcs'
import { containerQRdoc } from '../styles'

const QrDocView = ({ qrDocumentInfo, commentId, loadingQrDoc, errorQrDoc }) => {
  const dataBasicArr = getBasicData(qrDocumentInfo)

  const rowsSigners = toArray(qrDocumentInfo?.Comentarios)

  return (
    <Box>
      <NavbarQrDocView />
      <Box sx={containerQRdoc}>
        <ContainerQrDoc
          dataBasicArr={dataBasicArr}
          rowsSigners={rowsSigners}
          commentId={commentId}
          loadingQrDoc={loadingQrDoc}
          errorQrDoc={errorQrDoc}
        />
      </Box>
    </Box>
  )
}

export default QrDocView
