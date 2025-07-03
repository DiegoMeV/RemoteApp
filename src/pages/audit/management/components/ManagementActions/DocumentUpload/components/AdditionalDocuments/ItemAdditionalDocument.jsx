import CustomTextfield from '../../../CustomTextfield'
import { Controller, useForm } from 'react-hook-form'
import { Grid, TextField } from '@mui/material'
import { formatToLocaleDate } from '@/lib'
import { ElementAdditionalContainer } from '../../..'
import AdditionalOptions from './AdditionalOptions'

const ItemAdditionalDocument = ({
  document,
  index,
  ids,
  refecthDocumentsByActivity,
  handleDelete,
}) => {
  const idDocument = document?.Documentos?.id
  const { watch, control } = useForm({
    defaultValues: {
      [`fileName${idDocument}`]: document?.Documentos?.nombreMostrar ?? '',
    },
  })
  const fileName = watch(`fileName${idDocument}`) || ''
  const valueFileName = `${document?.Documentos?.nombre ?? ''}${
    document?.Documentos?.especificaciones?.tipo
      ? `.${document?.Documentos?.especificaciones?.tipo}`
      : ''
  }`

  return (
    <>
      <ElementAdditionalContainer>
        <Grid
          item
          xs={12}
          lg={3.5}
        >
          <Controller
            name={`fileName${idDocument}`}
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  size='small'
                  label='Nombre archivo'
                  value={`fileName${idDocument ?? ''}`}
                  {...field}
                  fullWidth
                />
              )
            }}
          />
        </Grid>
        <CustomTextfield
          lg={3.5}
          label='Archivo cargado'
          value={valueFileName}
        />
        <CustomTextfield
          lg={3}
          label='Fecha cargue archivo'
          value={formatToLocaleDate(document?.Documentos?.fechaCreacion) ?? ''}
        />
        <AdditionalOptions
          idDocument={idDocument}
          document={document}
          index={index}
          ids={ids}
          refecthDocumentsByActivity={refecthDocumentsByActivity}
          fileName={fileName}
          handleDelete={handleDelete}
        />
      </ElementAdditionalContainer>
    </>
  )
}

export default ItemAdditionalDocument
