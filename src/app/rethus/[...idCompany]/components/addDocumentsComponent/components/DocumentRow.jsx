import React, { useEffect, useState } from 'react'
import { Grid, IconButton, Tooltip, TextField } from '@mui/material'
import {
  ContentPasteOutlined,
  FileUploadOutlined,
  ReportGmailerrorredOutlined,
} from '@mui/icons-material'
import {
  BackdropLoading,
  formatDateForTextfield,
  toSnakeCase,
  useMutationDynamicBaseUrl,
} from '@/lib'
import toast from 'react-hot-toast'
import { useStoreActions } from 'easy-peasy'
import { Controller } from 'react-hook-form'
import { useCancelDocs, useProcessModifyItem, useUpdateActivityAction } from '../../../funcs'

const DocumentRow = ({
  fileRequired,
  setValue,
  infoProcessSelected,
  idCompany,
  idTaskAction,
  docsActivity,
  refetchInfoDocs,
  control,
  idActivityAction,
  idProcess,
  refetchInfoProcess,
}) => {
  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )

  const [infoDocument, setInfoDocument] = useState()

  const { modifyItemInformation, loadingItemCreation } = useProcessModifyItem(
    idActivityAction,
    idCompany
  )
  const { crateActivityAction, isPendingUpdateAction } = useUpdateActivityAction({
    idCompany,
    idProcess,
    idActivity: infoProcessSelected?.pendingActivities?.[0].id,
    modifyItemInformation,
    refetchInfoProcess,
    infoDocument,
  })
  const [fileInfo, setFileInfo] = useState()
  useEffect(() => {
    if (docsActivity) {
      const resultado = docsActivity
        .filter(
          (item) =>
            item.Documentos?.nombreMostrar.includes(fileRequired.name) &&
            item.Documentos?.estado !== 'ANULADO'
        )
        .map((item) => ({
          id: fileRequired?.id,
          idDocument: item.Documentos?.id,
          idDocumentVersion: item.id,
          documentStatus: item.Documentos?.estado,
          name: item.Documentos?.nombre,
          fechaCargue: formatDateForTextfield(item.Documentos?.fechaCreacion),
        }))
      setValue(`documentos.${toSnakeCase(fileRequired?.name)}`, resultado?.[0])
      setValue('idTaskAction', idTaskAction)
      setFileInfo({
        id: resultado?.[0]?.idDocument,
        name: resultado?.[0]?.name || '',
        fechaCargue: resultado?.[0]?.fechaCargue,
      })
    }
  }, [docsActivity, fileRequired, idTaskAction, setValue])

  const setPreviewer = useStoreActions((actions) => actions.previewer.setPreviewer)

  const { mutateAsync: uploadDoc, isPending } = useMutationDynamicBaseUrl({
    baseKey: 'urlDocuments',
    url: `documentos/uploadDoc`,
    isCompanyRequest: true,
    companyId: idCompany,
    onSuccess: (response) => {
      const infoDocument = {
        idTaskActionItem: fileRequired?.id,
        idDocument: response?.data?.[0]?.id,
        idDocumentVersion: response?.data?.[0]?.idVersion,
        documentStatus: response?.data?.[0]?.estado,
      }
      setInfoDocument(infoDocument)
      setValue('idTaskAction', idTaskAction)
      setValue(`documentos.${toSnakeCase(fileRequired?.name)}`, infoDocument)
      refetchInfoDocs()
      if (!idActivityAction) {
        crateActivityAction({
          body: {
            idTaskAction: idTaskAction,
          },
        })
        return
      }
      modifyItemInformation({ body: infoDocument })
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]
    if (selectedFile) {
      const infoToPush = new FormData()
      infoToPush.append('file', selectedFile)
      infoToPush.append('nombreMostrar', fileRequired.name)
      infoToPush.append('idProceso', infoProcessSelected?.id)
      infoToPush.append('idActivity', infoProcessSelected?.pendingActivities?.[0].id)
      if (fileInfo?.id) {
        uploadDoc({ qry: `?idDocumento=${fileInfo.id}`, body: infoToPush })
      } else {
        uploadDoc({ body: infoToPush })
      }
    }
    event.target.value = null
  }

  const idDocument = fileInfo?.id

  const { cancelDocument, loadingCancelDocument } = useCancelDocs({
    idCompany,
    idDocument,
    fileRequired,
    idTaskAction,
    refetchInfoDocs,
    setInfoDocument,
    setValue,
  })

  const handleCancelDocument = async () => {
    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: '',
      content: '¿Está seguro que desea anular el documento?',
      onConfirm: async () => {
        if (fileRequired?.required) {
          toast.error('No se puede anular un documento requerido')
          return
        }
        cancelDocument({ body: { estado: 'ANULADO' } })
      },
    })
  }

  return (
    <Grid
      container
      spacing={2}
      alignItems='center'
      my={2}
    >
      <BackdropLoading loading={isPending || loadingCancelDocument} />
      <Grid
        item
        xs={4}
      >
        <TextField
          label='Tipo de archivo '
          value={fileRequired.name}
          fullWidth
          variant='outlined'
          InputProps={{ readOnly: true }}
        />
      </Grid>
      <Grid
        item
        xs={4.5}
      >
        <Controller
          name={`documentos.${toSnakeCase(fileRequired.name)}.name`}
          rules={{ required: fileRequired.required ? 'Este campo es requerido' : false }}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              label='Nombre del archivo'
              value={fileInfo?.id ? field.value : ''}
              fullWidth
              variant='outlined'
              required={fileRequired.required}
              disabled
              error={!!error}
              helperText={error?.message}
              InputProps={{
                readOnly: true,
              }}
            />
          )}
        />
      </Grid>
      <Grid
        item
        xs={2}
      >
        <TextField
          label='Fecha de cargue'
          value={fileInfo?.fechaCargue || ''}
          fullWidth
          variant='outlined'
          disabled
        />
      </Grid>
      <Grid
        item
        xs={0.5}
      >
        <input
          type='file'
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id={`file-input-${fileRequired.name}`}
          name={fileRequired.name}
        />
        <label htmlFor={`file-input-${fileRequired.name}`}>
          <Tooltip title='Subir archivo'>
            <IconButton
              component='span'
              color='primary'
              disabled={isPendingUpdateAction || loadingItemCreation}
            >
              <FileUploadOutlined />
            </IconButton>
          </Tooltip>
        </label>
      </Grid>
      {fileInfo?.id && (
        <>
          <Grid
            item
            xs={0.5}
          >
            <Tooltip title='Ver archivo'>
              <IconButton
                onClick={() =>
                  setPreviewer({
                    open: true,
                    idDocument: fileInfo.id,
                    companyId: idCompany,
                    loadingPreviewer: true,
                  })
                }
              >
                <ContentPasteOutlined />
              </IconButton>
            </Tooltip>
          </Grid>
          {!fileRequired?.required && (
            <Grid
              item
              xs={0.5}
            >
              <Tooltip title='Anular'>
                <IconButton onClick={handleCancelDocument}>
                  <ReportGmailerrorredOutlined color={'error'} />
                </IconButton>
              </Tooltip>
            </Grid>
          )}
        </>
      )}
    </Grid>
  )
}

export default DocumentRow
