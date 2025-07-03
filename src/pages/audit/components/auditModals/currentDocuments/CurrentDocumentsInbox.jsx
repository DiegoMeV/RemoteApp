import { useEffect, useState } from 'react'
import { Box, CircularProgress, LinearProgress, Typography } from '@mui/material'
import {
  ClassicIconButton,
  CustomSearchDatagrid,
  NoDataOverlay,
  downloadBuffer,
  getRowClassName,
  resizeColumns,
  useGetBufferDocument,
} from '@/lib'
import { DataGridPremium, useGridApiRef } from '@mui/x-data-grid-premium'
import { useStoreActions, useStoreState } from 'easy-peasy'
import toast from 'react-hot-toast'
import { FolderZip, PictureAsPdf } from '@mui/icons-material'
import { columnsCurrentDocuments } from '../../funcs'
import { useQueryDynamicApi } from '@/libV4'

const CurrentDocumentsInbox = ({ idProcess }) => {
  const apiRef = useGridApiRef()
  const dark = useStoreState((state) => state.darkTheme.dark)
  const setPreviewer = useStoreActions((actions) => actions.previewer.setPreviewer)

  const { data: docVigData, isFetching: isLoading } = useQueryDynamicApi({
    baseKey: 'urlFiscalizacion',
    url: `/processes/${idProcess}/docs`,
  })

  const [rowSelectionModel, setRowSelectionModel] = useState([])
  const columns = columnsCurrentDocuments({ setPreviewer })
  const rows = docVigData?.data

  const { mutateAsync: getBuffer } = useGetBufferDocument({
    onSuccess: () => {
      toast.success('Descarga exitosa')
    },
    onError: (error) => {
      toast.error('Error ', error)
    },
  })

  const handleDownloadZip = async () => {
    if (!rowSelectionModel.length) {
      toast.error('Seleccione al menos un documento primero')
      return
    }
    try {
      const response = await getBuffer({
        body: {
          tipo: 'zip',
          idDocumento: rowSelectionModel,
          id_proceso: idProcess,
        },
        qry: `descargar`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      downloadBuffer(response)
    } catch (error) {
      toast.error(error)
    }
  }

  const handleDownloadPdf = async () => {
    if (!rowSelectionModel.length) {
      toast.error('Seleccione al menos un documento primero')
      return
    }
    await setPreviewer({
      open: true,
      idDocument: rowSelectionModel,
      idProcess: idProcess,
      loadingPreviewer: true,
      advice: rowSelectionModel?.length > 1 ? 'Por favor revisar el documento' : null,
    })
  }

  useEffect(() => {
    resizeColumns(apiRef, isLoading)
  }, [rows, isLoading, apiRef])

  return (
    <>
      {isLoading ? (
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          height='100%'
        >
          <CircularProgress size='150px' />
        </Box>
      ) : docVigData?.data?.length === 0 ? (
        <> No hay documentos vigentes para este tipo de proceso</>
      ) : (
        <>
          <Box
            display='flex'
            justifyContent='flex-end'
            margin={0.5}
          >
            <ClassicIconButton
              onClick={handleDownloadPdf}
              title='Descargar PDF'
              placement={'bottom'}
            >
              <PictureAsPdf />
            </ClassicIconButton>
            <ClassicIconButton
              onClick={handleDownloadZip}
              title='Descargar ZIP'
              placement={'bottom'}
            >
              <FolderZip />
            </ClassicIconButton>
          </Box>

          {docVigData?.data ? (
            <Box
              height='90%'
              bgcolor='backgroundWhite1'
            >
              <DataGridPremium
                apiRef={apiRef}
                columns={columns ?? []}
                rows={rows ?? []}
                checkboxSelection
                disableRowSelectionOnClick
                onRowSelectionModelChange={(newRowSelectionModel) => {
                  setRowSelectionModel(newRowSelectionModel)
                }}
                rowSelectionModel={rowSelectionModel}
                getRowClassName={(params) => getRowClassName(dark, params)}
                slots={{
                  toolbar: CustomSearchDatagrid,
                  noRowsOverlay: NoDataOverlay,
                  loadingOverlay: LinearProgress,
                }}
                initialState={{
                  pagination: { paginationModel: { pageSize: 50 } },
                  pinnedColumns: {
                    right: ['options', 'checkbox'],
                  },
                }}
              />
            </Box>
          ) : (
            <Typography variant='h5'>Aún no se han generado documentos</Typography>
          )}
        </>
      )}
    </>
  )
}
export default CurrentDocumentsInbox
