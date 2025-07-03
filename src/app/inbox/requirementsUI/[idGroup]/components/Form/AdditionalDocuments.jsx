import React from 'react'
import { Grid, TextField } from '@mui/material'
import styles from '../../styles/Requirements.module.css'
import { AdditionalOptions } from '.'
import { TextFieldReadOnly, formatToLocaleDate } from '@/lib'
import { Controller, useForm } from 'react-hook-form'

const AdditionalDocuments = ({
  document,
  index,
  ids,
  refecthDocumentsByActivity,
  refetchSourceProcess,
  handleDelete,
}) => {
  const idDocument = document?.Documentos?.id
  const { watch, control } = useForm()
  const fileName = watch(`fileName${idDocument}`)

  return (
    <Grid
      container
      className={styles.aditionalDocuments}
    >
      <Grid
        item
        xs={12}
        lg={3.5}
      >
        <Controller
          name={`fileName${idDocument}`}
          defaultValue={document?.Documentos?.nombreMostrar ?? ''}
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

      <TextFieldReadOnly
        lg={3}
        label='Archivo cargado'
        value={document?.Documentos?.nombre ?? ''}
      />

      <TextFieldReadOnly
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
        refetchSourceProcess={refetchSourceProcess}
        fileName={fileName}
        handleDelete={handleDelete}
      />
    </Grid>
  )
}

export default AdditionalDocuments
