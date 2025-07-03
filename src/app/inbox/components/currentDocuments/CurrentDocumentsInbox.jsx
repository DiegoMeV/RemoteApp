import { useEffect, useState } from 'react'
import { Box, CircularProgress, LinearProgress, Tabs, Tab } from '@mui/material'
import {
  ClassicIconButton,
  CustomSearchDatagrid,
  NoDataOverlay,
  downloadBuffer,
  getRowClassName,
  resizeColumns,
  useGetBufferDocument,
  useGetProcess,
} from '@/lib'
import { DataGridPremium, useGridApiRef } from '@mui/x-data-grid-premium'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { columnsCurrentDocuments } from '../funcs'
import toast from 'react-hot-toast'
import { FolderZip, PictureAsPdf } from '@mui/icons-material'
import {
  CustomModal,
  GenericTextfield,
  MagicString,
  useBoolean,
  useMutationDynamicBaseUrl,
  usePrivileges,
} from '@/libV4'

const CurrentDocumentsInbox = ({ idProcess }) => {
  const apiRef = useGridApiRef()
  const dark = useStoreState((state) => state.darkTheme.dark)
  const setPreviewer = useStoreActions((actions) => actions.previewer.setPreviewer)

  const {
    data: docVigData,
    isLoading,
    refetch,
    isFetching,
  } = useGetProcess({ qry: `/${idProcess}/docs` })

  const [cancelDoc, setCancelDoc] = useState({ id: '', comment: '' })
  const [rowSelectionModel, setRowSelectionModel] = useState([])
  const [tabIndex, setTabIndex] = useState(0)
  const hasPrivToCancel = usePrivileges('documentos.documentos.anular')
  const modalCancelDoc = useBoolean()
  const columns = columnsCurrentDocuments({
    setPreviewer,
    hasPrivToCancel,
    modalCancelDoc,
    setCancelDoc,
  })

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
  }, [docVigData, isLoading, apiRef])

  // Filtrar los datos según la pestaña activa
  const filteredRows = docVigData?.data?.filter((row) =>
    tabIndex === 0 ? row.isParentProcess === false : row.isParentProcess === true
  )
  const { mutateAsync: cancelDocument, isPending: loadingCancelDoc } = useMutationDynamicBaseUrl({
    baseKey: 'urlDocuments',
    url: `/documentos`,
    isCompanyRequest: true,
    method: 'PATCH',
    onSuccess: () => {
      refetch()
      toast.success('Documento anulado con éxito.')
      setCancelDoc({ id: '', comment: '' })
      modalCancelDoc.handleShow()
    },
    onError: (error) => {
      toast.error('Error al anular el documento ', error)
    },
  })
  const onSubmitCancelDoc = () => {
    if (!cancelDoc?.comment || cancelDoc?.comment.trim() === '') {
      toast.error('Por favor, ingrese un comentario para la anulación del documento.')
      return
    }
    cancelDocument({ qry: `/${cancelDoc?.id}/anular`, body: { comentario: cancelDoc?.comment } })
  }

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
          <CustomModal
            open={modalCancelDoc.show}
            handleClose={() => {
              modalCancelDoc.handleShow()
              setCancelDoc({ id: '', comment: '' })
            }}
            title={'Anulación de documento'}
            loading={loadingCancelDoc}
            actions={[
              {
                label: MagicString.GENERAL.CANCEL_TITLE,
                color: 'error',
                onClick: () => {
                  modalCancelDoc.handleShow()
                  setCancelDoc({ id: '', comment: '' })
                },
              },
              {
                label: MagicString.GENERAL.SAVE_TITLE,
                onClick: onSubmitCancelDoc,
              },
            ]}
          >
            <GenericTextfield
              label='Comentario'
              type='multiline'
              rows={5}
              onChange={(e) => {
                setCancelDoc({
                  ...cancelDoc,
                  comment: e.target.value,
                })
              }}
              value={cancelDoc?.comment}
            />
          </CustomModal>
          <Tabs
            value={tabIndex}
            onChange={(event, newValue) => setTabIndex(newValue)}
            indicatorColor='primary'
            textColor='primary'
            variant='fullWidth'
          >
            <Tab
              label='Proceso actual'
              sx={{ fontWeight: 'bold' }}
            />
            <Tab
              label='Documentos Heredados'
              sx={{ fontWeight: 'bold' }}
            />
          </Tabs>

          <Box
            display='flex'
            justifyContent='flex-end'
            margin={0.5}
          >
            <ClassicIconButton
              onClick={handleDownloadPdf}
              title='Descargar PDF'
              placement='bottom'
            >
              <PictureAsPdf />
            </ClassicIconButton>
            <ClassicIconButton
              onClick={handleDownloadZip}
              title='Descargar ZIP'
              placement='bottom'
            >
              <FolderZip />
            </ClassicIconButton>
          </Box>
          <Box
            height='85%'
            bgcolor='backgroundWhite1'
          >
            <DataGridPremium
              apiRef={apiRef}
              columns={columns ?? []}
              rows={filteredRows ?? []}
              loading={isFetching}
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
        </>
      )}
    </>
  )
}

export default CurrentDocumentsInbox
