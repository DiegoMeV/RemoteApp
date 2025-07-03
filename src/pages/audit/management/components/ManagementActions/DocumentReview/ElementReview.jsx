import { Checkbox, Grid } from '@mui/material'
import { ElementContainer, CustomTextfield } from '..'
import { conditionRenderOptions, fieldValues } from '../funcs'
import OptionsReview from './OptionsReview'
import { BackdropLoading, isEmpty, toArray, useMutationDynamicBaseUrl } from '@/lib'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const ElementReview = ({
  idAction,
  elementAction,
  ids,
  refetchManagement,
  selectedDocuments,
  setSelecteDocuments,
  idActivityAction,
  refetchElementActions,
  idGoToTask,
}) => {
  const [elementActionLocal, setElementActionLocal] = useState({})
  const [idTaskActionItem, setIdTaskActionItem] = useState('')

  const [idProcess, idActivity] = ids

  useEffect(() => {
    if (elementAction) {
      setElementActionLocal(elementAction)
    }
  }, [elementAction])

  const rejectionCommentDataExist = !isEmpty(elementActionLocal?.rejectionCommentData)

  const idDocument = elementActionLocal?.documentToBeHandledData?.id
  const renderOptions = conditionRenderOptions(elementActionLocal)
  const { type, documentName, generationDate, status } = fieldValues(elementActionLocal)

  const handleSelectDocument = () => {
    if (selectedDocuments?.includes(idDocument)) {
      setSelecteDocuments(selectedDocuments.filter((id) => id !== idDocument))
    } else {
      setSelecteDocuments([...toArray(selectedDocuments), idDocument])
    }
  }

  const { mutateAsync: performAction, isPending: updatingItemAction } = useMutationDynamicBaseUrl({
    isCompanyRequest: true,
    baseKey: 'urlFiscalizacion',
    url: `/processes/${idProcess}/activities/${idActivity}/items-to-perform/${idAction}`,
    method: 'get',
    onSuccess: (response) => {
      const newData = response?.data?.find((element) => element?.id === idTaskActionItem)
      setElementActionLocal(newData)
    },
    onError: () => {
      refetchElementActions()
      refetchManagement()
    },
  })

  const { mutateAsync: reviewDocument, isPending: reviewingDocument } = useMutationDynamicBaseUrl({
    isCompanyRequest: true,
    baseKey: 'urlFiscalizacion',
    url: `/processes/activity-actions`,
    onSuccess: async (response) => {
      await setIdTaskActionItem(response?.data?.idTaskActionItem)
      performAction()
      toast.success('Documento revisado correctamente')
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error || 'Error al revisar documento')
    },
  })

  const disabledReview =
    elementActionLocal?.documentToBeHandledData?.status === 'RECHAZADO' ||
    elementActionLocal?.documentToBeHandledData?.status === 'REVISAR'

  return (
    <ElementContainer
      isRequired={elementActionLocal?.isRequired ?? false}
      sx={{
        position: 'relative',
      }}
    >
      <BackdropLoading
        loading={reviewingDocument || updatingItemAction}
        sx={{
          position: 'absolute',
          borderRadius: '5px',
          zIndex: 1,
        }}
      />
      {rejectionCommentDataExist && (
        <CustomTextfield
          md={12}
          lg={12}
          label='Causa de devolución'
          type='multiline'
          error={true}
          value={elementActionLocal?.rejectionCommentData?.comentario ?? ''}
        />
      )}
      <Grid
        item
        xs={1}
        md={0.5}
      >
        <Checkbox
          checked={selectedDocuments?.includes(idDocument)}
          onChange={handleSelectDocument}
        />
      </Grid>
      <CustomTextfield
        xs={11}
        md={5.5}
        lg={3}
        label='Tipo'
        value={type}
      />
      <CustomTextfield
        lg={3}
        label='Nombre del documento cargado'
        value={documentName}
      />
      <CustomTextfield
        lg={3}
        label='Fecha de generación'
        value={generationDate}
      />
      <CustomTextfield
        lg={2.5}
        label='Estado'
        value={status}
      />
      {renderOptions && (
        <OptionsReview
          elementActionLocal={elementActionLocal}
          idActivityAction={idActivityAction}
          idGoToTask={idGoToTask}
          currentState={elementActionLocal?.activityActionItemData?.documentData?.status}
          disabledReview={disabledReview}
          reviewDocument={reviewDocument}
        />
      )}
    </ElementContainer>
  )
}

export default ElementReview
