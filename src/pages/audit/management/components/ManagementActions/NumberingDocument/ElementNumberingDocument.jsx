import { Box, Button, Checkbox, Grid, TextField } from '@mui/material'
import { ElementContainer, CustomTextfield } from '..'
import { fieldValues } from '../funcs'
import {
  BackdropLoading,
  ClassicIconButton,
  CustomOptionAutocompleteSubSeries,
  GenericAutocomplete,
  HeaderOptionsAutocompleteSubSeries,
  ValueListGlobal,
  useBoolean,
  useGetSubseriesTRD,
  useMutationDynamicBaseUrl,
  usePaginationGlobal,
  useSearch,
} from '@/lib'
import { ContentPasteGo, Save } from '@mui/icons-material'
import { subseriesColumns } from './constants'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useProcessFunctions, useProcessModifyItem } from '../hooks'
import { useStoreActions } from 'easy-peasy'
import { AccessControl } from '@/libV4'

const ElementNumberingDocument = ({
  elementAction,
  idTaskAction,
  ids,
  refetchManagement,
  selectedDocuments,
  setSelecteDocuments,
  idActivityAction,
  refetchElementActions,
}) => {
  const [idProcess, idActivity] = ids
  const modalSubSeries = useBoolean()
  const [selectedSubSeries, setSelectedSubSeries] = useState(
    elementAction?.activityActionItemData?.tablaRetencionData ?? null
  )
  const [identifier, setIdentifier] = useState(null)

  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )

  const setPreviewer = useStoreActions((actions) => actions.previewer.setPreviewer)

  const searchSubSerie = useSearch()
  const [pageSize, setPageSize] = useState(50)
  const [cursor, setCursor] = useState(0)
  const [responseNumberingDocument, setResponseNumberingDocument] = useState(null)

  const idDocument =
    elementAction?.documentToBeHandledData?.id ??
    elementAction.activityActionItemData?.documentData?.id

  const disabledNumberingDocument = elementAction?.activityActionItemData?.tablaRetencionData
    ? true
    : false

  const disabledElement =
    elementAction?.documentToBeHandledData?.id || elementAction.activityActionItemData?.documentData
      ? false
      : true

  const handleChangeSubSeries = (newValue) => {
    setSelectedSubSeries(newValue)
  }

  const { type, generationDate, status } = fieldValues(elementAction)

  const handleSelectDocument = () => {
    if (selectedDocuments.includes(idDocument)) {
      setSelecteDocuments(selectedDocuments.filter((id) => id !== idDocument))
    } else {
      setSelecteDocuments([...selectedDocuments, idDocument])
    }
  }

  const { modifyItemInformation, loadingItemCreation } = useProcessModifyItem(
    idActivityAction,
    refetchElementActions
  )

  const onSuccessUpdateProcess = (response) => {
    const qry = response?.data?.id ? `${response?.data?.id}/items` : ''
    const body = {
      idTaskActionItem: elementAction.id,
      idDocument: responseNumberingDocument?.id,
      idDocumentVersion: responseNumberingDocument?.idVersion,
      documentStatus: responseNumberingDocument?.estado,
      idTablaRetencion: responseNumberingDocument?.idTablaRetencion,
    }
    modifyItemInformation({ qry, body })
  }

  const { updateProcess, isPendingUpdateProcess } = useProcessFunctions(
    idProcess,
    idActivity,
    refetchManagement,
    null,
    onSuccessUpdateProcess
  )

  const {
    data: subSeries,
    isLoading: loadingSubseries,
    isFetching: fetchingSubSeries,
  } = useGetSubseriesTRD({
    pageSize,
    cursor,
    searchText: searchSubSerie.searchText,
  })

  const pagination = usePaginationGlobal(
    subSeries,
    { setCursor, setPageSize },
    loadingSubseries,
    'cantidad'
  )
  const { mutateAsync: regenerateDocument, isPending: pendingRegeneration } =
    useMutationDynamicBaseUrl({
      isCompanyRequest: true,
      baseKey: 'urlDocuments',
      method: 'get',
      url: `/documentos`,
    })

  const { mutateAsync: updateDocument, isPending: updatingDocument } = useMutationDynamicBaseUrl({
    baseKey: 'urlDocuments',
    isCompanyRequest: true,
    url: `/documentos/${idDocument}`,
    method: 'put',
    onSuccess: (response) => {
      const responseObjet = response?.data ?? {}
      regenerateDocument({ qry: `/${responseObjet?.id}/regenerar` })
      setResponseNumberingDocument(responseObjet)
      if (!idActivityAction) {
        updateProcess({
          body: { idTaskAction: idTaskAction },
        })
      } else {
        const body = {
          idTaskActionItem: elementAction?.id,
          idDocument: responseObjet?.id,
          idDocumentVersion: responseObjet?.especificaciones?.version,
          documentStatus: responseObjet?.estado,
          idTablaRetencion: responseObjet?.idTablaRetencion,
        }
        modifyItemInformation({ body })
      }
    },
  })

  const saveNumberingDocument = () => {
    if (!selectedSubSeries) {
      toast.error('Debe seleccionar una subserie')
      return
    }
    setConfirmAlertProps({
      open: true,
      icon: 'info',
      title: 'Confirmar',
      content: 'Al guardar la subserie no podrá ser modificada, ¿Desea continuar?',
      onConfirm: () => {
        updateDocument({
          qry: ``,
          body: {
            idTablaRetencion: selectedSubSeries?.id,
            identificador: identifier,
          },
        })
      },
    })
  }

  return (
    <ElementContainer isRequired={elementAction?.isRequired ?? false}>
      <BackdropLoading
        loading={
          updatingDocument || isPendingUpdateProcess || loadingItemCreation || pendingRegeneration
        }
      />
      <Grid
        item
        xs={1}
        md={0.5}
      >
        <Checkbox
          checked={selectedDocuments.includes(idDocument)}
          onChange={handleSelectDocument}
        />
      </Grid>
      <CustomTextfield
        md={5.5}
        lg={4}
        label='Tipo'
        value={type}
      />
      <CustomTextfield
        lg={3.5}
        label='Fecha de generación'
        value={generationDate}
      />
      <CustomTextfield
        lg={3.5}
        label='Estado'
        value={status}
      />

      <Grid
        item
        xs={1}
        md={0.5}
      >
        <ClassicIconButton
          title='Visualizar'
          onClick={async () => {
            setPreviewer({
              open: true,
              idDocument: idDocument,
              loadingPreviewer: true,
            })
          }}
        >
          <ContentPasteGo />
        </ClassicIconButton>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        lg={12}
      >
        <GenericAutocomplete
          value={selectedSubSeries}
          autocompleteProps={{
            options: subSeries?.data ?? [],
            loadingOptions: loadingSubseries || fetchingSubSeries,
            openModal: modalSubSeries.handleShow,
            disabled: disabledElement || disabledNumberingDocument,
            onChange: (_, newValue) => handleChangeSubSeries(newValue),
            groupBy: () => 'All Options',
            renderGroup: (params) => (
              <Box key='header-options'>
                <HeaderOptionsAutocompleteSubSeries params={params} />
              </Box>
            ),
            renderOption: (props, option) => {
              const { key, ...rest } = props
              return (
                <Box
                  key={`${option.id}${option?.jobTitle?.id}`}
                  {...rest}
                >
                  <CustomOptionAutocompleteSubSeries
                    key={key}
                    option={option}
                  />
                </Box>
              )
            },
          }}
          textFieldProps={{
            label: 'Subserie',
            onChange: (e) => searchSubSerie?.handleSearchText(e.target.value),
          }}
        />
      </Grid>
      <AccessControl privilege={'procesos.gestion.numeracion_manual_documentos'}>
        <Grid
          item
          xs={12}
          md={6}
          lg={6}
        >
          <TextField
            lg={3.5}
            size='small'
            disabled={elementAction?.documentToBeHandledData?.identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            label='Número Asignado'
            InputLabelProps={{ shrink: true }}
            value={elementAction?.documentToBeHandledData?.identifier}
          />
        </Grid>
      </AccessControl>
      <Grid
        container
        item
        justifyContent='flex-end'
      >
        <Button
          startIcon={<Save />}
          variant='contained'
          onClick={saveNumberingDocument}
          disabled={disabledElement || disabledNumberingDocument}
        >
          Guardar
        </Button>
      </Grid>
      <ValueListGlobal
        title='Subseries'
        openOptions={modalSubSeries}
        rows={subSeries?.data ?? []}
        searchOptions={searchSubSerie}
        loading={(loadingSubseries || fetchingSubSeries) ?? false}
        columns={subseriesColumns}
        selectedOption={(params) => handleChangeSubSeries(params.row)}
        pagination={pagination}
      />
    </ElementContainer>
  )
}

export default ElementNumberingDocument
