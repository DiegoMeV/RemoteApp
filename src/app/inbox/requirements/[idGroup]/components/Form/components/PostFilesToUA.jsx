import { Box, Button } from '@mui/material'
import { FormGenericContainer, FormGenericHeader } from '..'
import { useFieldArray, useForm } from 'react-hook-form'
import { handleNextStep } from '../../../funcs'
import { toArray } from '@/lib'
import ItemFilesUA from './ItemFilesUA'
import { Add } from '@mui/icons-material'
import { useState } from 'react'
import { MenuChoose } from '.'

const PostFilesToUA = ({ stepVars, fileVars }) => {
  const { step: currentStep, setActiveStep: setStep, processIdentifier } = stepVars
  const { stepFiles, setStepFiles } = fileVars

  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      files: toArray(stepFiles),
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'files',
  })

  const onSubmit = (data) => {
    const dataFile = data.files.map((item) => {
      if (item?.isUrl) {
        return { id: item.id, url: item.url }
      }
      return { id: item.id, idFile: item.file }
    })
    setStepFiles(dataFile)
    handleNextStep(setStep)
  }

  const [anchorEl, setAnchorEl] = useState(null)

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box sx={{ height: '100%' }}>
      <FormGenericHeader title='Archivos Enlazados' />
      <FormGenericContainer
        onSubmit={handleSubmit(onSubmit)}
        currentStep={currentStep}
        setStep={setStep}
      >
        <Box
          width='100%'
          display='flex'
          justifyContent='flex-end'
          my={2}
        >
          <Button
            variant='outlined'
            onClick={handleClickMenu}
            startIcon={<Add />}
            size='small'
          >
            Agregar opcion
          </Button>
        </Box>
        <Box
          minHeight='200px'
          maxHeight='400px'
          width='100%'
          overflow={'auto'}
          py='10px'
        >
          <MenuChoose
            anchorEl={anchorEl}
            handleClose={handleClose}
            append={append}
          />
          {fields.map((file, index) => {
            return (
              <ItemFilesUA
                item={file}
                key={file.id}
                index={index}
                remove={remove}
                fieldsLength={fields.length}
                processIdentifier={processIdentifier}
                control={control}
                setValue={setValue}
                watch={watch}
              />
            )
          })}
        </Box>
      </FormGenericContainer>
    </Box>
  )
}

export default PostFilesToUA
