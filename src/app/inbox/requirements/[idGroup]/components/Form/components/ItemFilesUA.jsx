import { BackdropLoading, ClassicIconButton, CustomTextField, useUploadDocument } from '@/lib'
import { Delete } from '@mui/icons-material'
import { Box } from '@mui/material'

import toast from 'react-hot-toast'
import { FileInputSection } from '.'
import { useState } from 'react'

const textInputType = (name, label, readOnly, type, required) => {
  return {
    name: name,
    label: label,
    required: required ?? false,
    type: type,
    readOnly,
    sx: { width: '100%', minWidth: '100px' },
  }
}

const ItemFilesUA = ({
  index,
  remove,
  fieldsLength,
  processIdentifier,
  control,
  setValue,
  item,
  watch,
}) => {
  const [canWrite, setCanWrite] = useState(false)
  const handleRemove = (position) => {
    if (fieldsLength !== 1) {
      remove(position)
      return
    }

    toast.error('No se pudo eliminar, al menos debe tener un elemento')
  }

  const { mutateAsync: uploadDoc, isPending: isLoadingUpload } = useUploadDocument({
    onSuccess: (response) => {
      setValue(`files.${index}.file`, response?.data[0]?.id)
      setValue(`files.${index}.nameFile`, response?.data[0]?.nombre)
      setCanWrite(true)
      toast.success('Documento cargado correctamente')
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })

  const urlItem = textInputType(`files.${index}.url`, 'Url archivo', false, 'url', true)

  return (
    <Box
      gap='10px'
      width='100%'
      mb={2}
      display='flex'
      px={1}
    >
      <BackdropLoading loading={isLoadingUpload} />
      {!item.isUrl && (
        <FileInputSection
          uploadDoc={uploadDoc}
          item={item}
          index={index}
          textInputType={textInputType}
          control={control}
          watch={watch}
          processIdentifier={processIdentifier}
          canWrite={canWrite}
        />
      )}
      {item.isUrl && (
        <CustomTextField
          item={urlItem}
          control={control}
        />
      )}

      <Box width='40px'>
        <ClassicIconButton
          onClick={() => handleRemove(index)}
          title={'Eliminar'}
          placement={'bottom'}
        >
          <Delete />
        </ClassicIconButton>
      </Box>
    </Box>
  )
}

export default ItemFilesUA
