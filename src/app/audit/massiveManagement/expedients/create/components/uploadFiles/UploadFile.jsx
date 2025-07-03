import { useEffect, useState } from 'react'
import { useApisRequests } from './funcs'
import { BackdropLoading } from '@/libV4'
import { Box, CircularProgress, IconButton } from '@mui/material'
import { FileUploadButton } from './FileUploadButton'
import { ClassicIconButton, GenericTable } from '@/lib'
import { Delete, Download } from '@mui/icons-material'
import { useStoreActions } from 'easy-peasy'

const UploadFile = ({ idMassiveActivity, form, setActiveStep }) => {
  const handleRemoveRow = (fileId) => {
    deleteFile({ qry: `/${fileId}` })
  }
  useEffect(() => {
    if (form.getValues('action') !== 'UPLOAD_FILE') {
      setActiveStep(2)
      return
    }
  }, [form, setActiveStep])
  const setPreviewer = useStoreActions((actions) => actions.previewer.setPreviewer)

  const [rows, setRows] = useState([])
  const columns = [
    { field: 'fileName', headerName: 'Nombre Archivo', width: 200 },
    {
      field: 'options',
      headerName: '',
      minWidth: 100,
      resizable: false,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <>
            <ClassicIconButton
              onClick={() =>
                setPreviewer({
                  open: true,
                  idDocument: params.row?.documentId,
                  idVersion: params.row?.versionDoc,
                  nameFile: params.row?.fileName,
                  loadingPreviewer: true,
                })
              }
              title='Descargar'
            >
              <Download />
            </ClassicIconButton>
            <IconButton onClick={() => handleRemoveRow(params.row?.fileId)}>
              <Delete />
            </IconButton>
          </>
        )
      },
    },
  ]

  const { deleteFile, uploadDoc, addToMassiveFile, files, isLoading, isError, loading } =
    useApisRequests({
      idMassiveActivity,
    })

  useEffect(() => {
    if (files) {
      setRows(
        files.data.map((file) => ({
          fileName: file.documentInfo?.nombre,
          fileId: file.id,
          documentId: file.documentInfo?.id,
          versionDoc: file.documentInfo?.especificaciones?.version,
        }))
      )
    }
  }, [files])

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files)
    files.forEach(async (fileItem) => {
      const formData = new FormData()
      formData.append('file', fileItem)
      const infoUpload = await uploadDoc(formData)
      if (infoUpload.success) {
        await addToMassiveFile({ body: { idFile: infoUpload.data[0].id } })
      }
    })
  }

  return (
    <Box
      sx={{ p: 2 }}
      bgcolor={'backgroundWhite1'}
      borderRadius={2}
      overflow={'auto'}
    >
      <BackdropLoading loading={loading} />
      <FileUploadButton
        onUpload={handleFileUpload}
        isMultiple={true}
        disabled={isLoading}
      />
      {isLoading && <CircularProgress />}
      {isError ? (
        <p>Error al cargar los archivos</p>
      ) : (
        <GenericTable
          rows={rows}
          columns={columns}
          getRowId={(row) => row.fileId}
        />
      )}
    </Box>
  )
}

export default UploadFile
