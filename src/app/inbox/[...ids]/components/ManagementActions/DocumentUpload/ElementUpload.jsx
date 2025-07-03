import { Grid } from '@mui/material'
import { ElementContainer, CustomTextfield } from '../'
import OptionsUpload from './OptionsUpload'
import { ClassicIconButton, formatToLocaleDate } from '@/lib'
import { NotListedLocationRounded } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { BackdropLoading } from '@/libV4'
import { useUpload } from './hooks'

const ElementUpload = ({
  index,
  elementAction,
  idActivityAction,
  ids,
  refetchElementActions,
  refecthDocumentsByActivity,
  idAction,
}) => {
  // const { createdAt } = getDisplayedValues(elementAction)

  const [elementActionLocal, setElementActionLocal] = useState({})

  useEffect(() => {
    if (elementAction) {
      setElementActionLocal(elementAction)
    }
  }, [elementAction])

  const createdAt =
    formatToLocaleDate(elementActionLocal?.activityActionItemData?.documentData?.createdAt) ?? ''

  const documentNameUpload = elementActionLocal?.activityActionItemData?.documentData?.name ?? ''

  const { handleFileUpload, handleCancelDocument, isLoading } = useUpload(
    ids,
    elementActionLocal,
    idActivityAction,
    refetchElementActions,
    refecthDocumentsByActivity,
    setElementActionLocal,
    idAction
  )

  return (
    <ElementContainer
      isRequired={elementActionLocal?.isRequired ?? false}
      sx={{
        position: 'relative',
      }}
    >
      <BackdropLoading
        loading={isLoading}
        sizeLoading={80}
        sx={{
          position: 'absolute',
          borderRadius: '5px',
          zIndex: 1,
        }}
      />
      {elementActionLocal.rejectionCommentData?.comentario && (
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
        lg={0.3}
      >
        <ClassicIconButton title={elementActionLocal?.description}>
          <NotListedLocationRounded />
        </ClassicIconButton>
      </Grid>
      <CustomTextfield
        xs={11}
        md={5}
        lg={3.5}
        label='Tipo'
        value={elementActionLocal?.name ?? ''}
      />

      <CustomTextfield
        lg={3}
        label='Archivo cargado'
        value={documentNameUpload}
      />
      <CustomTextfield
        lg={3}
        label='Fecha cargue archivo'
        value={createdAt}
      />
      <OptionsUpload
        index={index}
        elementActionLocal={elementActionLocal}
        handleFileUpload={handleFileUpload}
        handleCancelDocument={handleCancelDocument}
      />
    </ElementContainer>
  )
}

export default ElementUpload
