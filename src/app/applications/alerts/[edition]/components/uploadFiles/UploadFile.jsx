import { useEffect, useState } from 'react'
import { Box, CircularProgress } from '@mui/material'
import { BackdropLoading, CustomAccordion } from '@/lib'
import { FileUploadButton } from './FileUploadButton'
import { FileRow } from './FileRow'
import { useApisRequests } from './funcs'

const UploadFile = ({ infoAlert, isView }) => {
  const [rows, setRows] = useState([])
  const [uploadFileAccState, setUploadFileAccState] = useState(false)
  const { uploadDoc, addToAlertFile, deleteFile, files, isLoading, isError, loading } =
    useApisRequests({
      infoAlert,
      setRows,
      uploadFileAccState,
    })

  useEffect(() => {
    if (files) {
      setRows(
        files.data.map((file) => ({
          fileName: file.documentoInfo?.nombre,
          fileId: file.id,
          documentId: file.documentoInfo?.id,
          versionDoc: file.documentoInfo?.especificaciones?.version,
        }))
      )
    }
  }, [files])

  const handleRemoveRow = (index) => {
    deleteFile({ id: rows[index].fileId, body: { esBorrado: true }, index })
  }
  const handleOpenUploadFileAcc = () => {
    setUploadFileAccState(!uploadFileAccState)
  }

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files)

    files.forEach(async (fileItem) => {
      const formData = new FormData()
      formData.append('file', fileItem)
      // TODO: formData.append('idExpedienteSGDEA', infoAlert?.sgdea_id_expediente)

      const infoUpload = await uploadDoc(formData)

      if (infoUpload.success) {
        await addToAlertFile({ alerta_id: infoAlert?.id, id_documento: infoUpload.data[0].id })
      }
    })
  }

  return (
    <CustomAccordion
      title='Cargue de documentos'
      color='primary'
      disabledAccordion={!infoAlert}
      expandedValue={uploadFileAccState}
      onClickAccordion={handleOpenUploadFileAcc}
    >
      <Box
        sx={{ p: 2 }}
        bgcolor={'backgroundWhite1'}
        borderRadius={2}
      >
        <BackdropLoading loading={loading} />
        <FileUploadButton
          onUpload={handleFileUpload}
          isMultiple={true}
          disabled={isView || isLoading}
        />
        {isLoading && <CircularProgress />}
        {isError ? (
          <p>Error al cargar los archivos</p>
        ) : (
          rows.map((row, index) => (
            <FileRow
              key={index}
              file={row}
              onRemove={() => handleRemoveRow(index)}
              isView={isView}
            />
          ))
        )}
      </Box>
    </CustomAccordion>
  )
}

export default UploadFile
