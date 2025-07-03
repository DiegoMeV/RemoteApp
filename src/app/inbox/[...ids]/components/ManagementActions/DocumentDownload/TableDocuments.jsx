import { DataGridPremium, useGridApiRef } from '@mui/x-data-grid-premium'
import {
  ClassicIconButton,
  CustomModal,
  NoDataOverlay,
  SearchTable,
  downloadBuffer,
  getRowClassName,
  useBoolean,
  useGetBufferDocument,
} from '@/lib'
import { Box, LinearProgress } from '@mui/material'
import { FolderZip, PictureAsPdf } from '@mui/icons-material'
import { documentsColumns, useDocumentSearch } from './funcs'
import toast from 'react-hot-toast'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useEffect, useState } from 'react'
import FormReview from '../DocumentReview/FormReview'
import { documentStatus } from '../constants'

const TableDocuments = ({ action, elementData, ids, refetchManagement }) => {
  const apiRef = useGridApiRef()
  const dark = useStoreState((state) => state.darkTheme.dark)
  const idProcess = ids?.[0]
  const rows = elementData ?? []
  const setPreviewer = useStoreActions((actions) => actions.previewer.setPreviewer)
  const [rowSelectionModel, setRowSelectionModel] = useState([])
  const [selectedRowsIds, setSelectedRowsIds] = useState([])
  const { documents, searchDocument, onSearchChange, clearSearch } = useDocumentSearch({ rows })
  const [documentData, setDocumentData] = useState()
  const cancelModal = useBoolean()

  const openCancelModal = async (params) => {
    await setDocumentData(params?.row)
    cancelModal.handleShow()
  }
  const columns = documentsColumns(openCancelModal)

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
        body: { tipo: 'zip', idDocumento: selectedRowsIds, id_proceso: idProcess },
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
    if (!selectedRowsIds.length) {
      toast.error('Seleccione al menos un documento primero')
      return
    }
    await setPreviewer({
      open: true,
      idDocument: selectedRowsIds,
      idProcess: idProcess,
      loadingPreviewer: true,
      advice: selectedRowsIds?.length > 1 ? 'Por favor revisar el documento' : null,
    })
  }

  useEffect(() => {
    if (apiRef.current) {
      const selectedRowsMap = apiRef.current.getSelectedRows()
      const selectedRowsArray = Array.from(selectedRowsMap.values())
      const selectedRowIds = selectedRowsArray.map((row) => row?.documentToBeHandledData?.id)
      setSelectedRowsIds(selectedRowIds)
    }
  }, [rowSelectionModel, apiRef])

  return (
    <>
      <Box
        display='flex'
        justifyContent='space-between'
        margin={0.5}
      >
        <Box width='80%'>
          <SearchTable
            searchText={searchDocument}
            onChange={onSearchChange}
            clearSearch={clearSearch}
          />
        </Box>
        <Box>
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
      </Box>

      <Box
        minHeight={500}
        maxHeight={52 * 50 + 130}
        bgcolor='backgroundWhite1'
      >
        <DataGridPremium
          apiRef={apiRef}
          rows={documents ?? []}
          columns={columns ?? []}
          pagination
          getRowClassName={(params) => getRowClassName(dark, params)}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel)
          }}
          rowSelectionModel={rowSelectionModel}
          pageSizeOptions={[50]}
          initialState={{
            pagination: { paginationModel: { pageSize: 50 } },
            pinnedColumns: {
              right: ['options'],
            },
          }}
          slots={{
            loadingOverlay: LinearProgress,
            noRowsOverlay: NoDataOverlay,
          }}
        />
      </Box>
      <CustomModal
        open={cancelModal.show}
        handleClose={cancelModal.handleShow}
        title={`Rechazar documento - ${documentData?.documentData?.name ?? ''}`}
      >
        <FormReview
          idTaskAction={action?.idTaskAction}
          state={documentStatus.rejected}
          elementAction={documentData}
          ids={ids}
          refetchManagement={refetchManagement}
          handleCloseModal={cancelModal?.handleShow}
        />
      </CustomModal>
    </>
  )
}

export default TableDocuments
