import { Box, Button, Checkbox, TextField } from '@mui/material'
import {
  ClassicIconButton,
  CustomOptionAutocompleteSubSeries,
  HeaderOptionsAutocompleteSubSeries,
  useMutationDynamicBaseUrl,
} from '@/lib'
import { ContentPasteGo, Save } from '@mui/icons-material'
import { subSeriesColumns } from './constants'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useProcessModifyItem } from '../hooks'
import { useStoreActions } from 'easy-peasy'
import useItemsToPerform from '../../../hooks/useItemsToPerform'
import {
  AccessControl,
  BackdropLoading,
  ElementContainer,
  GenericAutocompleteRequest,
  GenericFields,
} from '@/libV4'
import { numberingFields } from './funcs'

const ElementNumberingDocument = ({
  elementAction,
  ids,
  idAction,
  selectedDocuments,
  setSelecteDocuments,
  idActivityAction,
  refetchElementActions,
}) => {
  const [idProcess, idActivity] = ids

  const [selectedSubSeries, setSelectedSubSeries] = useState(
    elementAction?.activityActionItemData?.tablaRetencionData ?? null
  )

  const [identifier, setIdentifier] = useState(null)

  const [elementActionLocal, setElementActionLocal] = useState(elementAction)

  useEffect(() => {
    if (elementAction) {
      setElementActionLocal(elementAction)
    }
  }, [elementAction])

  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )

  const setPreviewer = useStoreActions((actions) => actions.previewer.setPreviewer)

  const idDocument =
    elementActionLocal?.documentToBeHandledData?.id ??
    elementActionLocal.activityActionItemData?.documentData?.id

  const disabledNumberingDocument = elementActionLocal?.activityActionItemData?.tablaRetencionData
    ? true
    : false

  const disabledElement =
    elementActionLocal?.documentToBeHandledData?.id ||
    elementActionLocal.activityActionItemData?.documentData
      ? false
      : true

  const handleChangeSubSeries = (newValue) => {
    setSelectedSubSeries(newValue)
  }

  const handleSelectDocument = () => {
    if (selectedDocuments.includes(idDocument)) {
      setSelecteDocuments(selectedDocuments.filter((id) => id !== idDocument))
    } else {
      setSelecteDocuments([...selectedDocuments, idDocument])
    }
  }

  const { performAction, updatingItemAction } = useItemsToPerform({
    idProcess,
    idActivity,
    idAction,
    onSuccess: (response) => {
      setElementActionLocal(response?.data?.[0])
    },
    onError: () => {
      refetchElementActions?.()
    },
  })

  const onSuccessAditional = async (response) => {
    performAction({ qry: `?idTaskActionItem=${response?.data?.idTaskActionItem}` })
  }

  const { modifyItemInformation, loadingItemCreation } = useProcessModifyItem(
    idActivityAction,
    null,
    onSuccessAditional
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

      const body = {
        idTaskActionItem: elementActionLocal?.id,
        idDocument: responseObjet?.id,
        idDocumentVersion: responseObjet?.especificaciones?.version,
        documentStatus: responseObjet?.estado,
        idTablaRetencion: responseObjet?.idTablaRetencion,
      }
      modifyItemInformation({ body })
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

  const fields = numberingFields(elementActionLocal)

  return (
    <ElementContainer
      isRequired={elementActionLocal?.isRequired ?? false}
      className='relative'
    >
      <BackdropLoading
        loading={
          updatingItemAction || updatingDocument || loadingItemCreation || pendingRegeneration
        }
        sizeLoading={80}
        sx={{
          position: 'absolute',
          borderRadius: '5px',
          zIndex: 1,
        }}
      />
      <div className='xs:col-span-1'>
        <Checkbox
          checked={selectedDocuments.includes(idDocument)}
          onChange={handleSelectDocument}
        />
      </div>

      <GenericFields fields={fields} />

      <div className='col-span-1 flex justify-end'>
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
      </div>

      <div className='col-span-12'>
        <GenericAutocompleteRequest
          label='Subserie'
          value={selectedSubSeries}
          onChange={(_, newValue) => handleChangeSubSeries(newValue)}
          requestprops={{
            baseKey: 'urlDocuments',
            isCompanyRequest: true,
            url: `/tablaRetencion/subSeries`,
            counter: 'cantidad',
          }}
          queryRequest={{ querySearch: 'querySearch' }}
          autocompleteprops={{
            disabled: disabledElement || disabledNumberingDocument,
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
          vlprops={{
            shouldClose: true,
            columns: subSeriesColumns,
          }}
        />
      </div>
      <AccessControl privilege={'procesos.gestion.numeracion_manual_documentos'}>
        <div className='xs:col-span-12 lg:col-span-6'>
          <TextField
            lg={3.5}
            size='small'
            fullWidth
            disabled={elementActionLocal?.documentToBeHandledData?.identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            label='Número Asignado'
            InputLabelProps={{ shrink: true }}
            value={elementActionLocal?.documentToBeHandledData?.identifier}
          />
        </div>
      </AccessControl>
      <div className='col-span-12 flex justify-end'>
        <Button
          startIcon={<Save />}
          variant='contained'
          onClick={saveNumberingDocument}
          disabled={disabledElement || disabledNumberingDocument}
        >
          Guardar
        </Button>
      </div>
    </ElementContainer>
  )
}

export default ElementNumberingDocument
