import { BackdropLoading, CustomAccordion } from '@/lib'
import { InputsModel } from './model'
import { CategoryTable } from './category'
import { Box, Button, Typography } from '@mui/material'
import { sxContainer } from '@/app/applications/styles'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { conditionalRequest, useUpdateRequest } from '../funcs'
import { DatablocksAcordions } from './datablock'

const StepsToCreateAModel = ({ infoModels, idEdition }) => {
  const navigate = useNavigate()
  const modelValues = infoModels?.data?.[0] || {}
  const state = infoModels?.data?.[0]?.activo === 'N' ? false : true
  const solicita_contrato =
    infoModels?.data?.[0]?.solicita_contrato === 'S' ||
    infoModels?.data?.[0]?.solicita_contrato === '1'
      ? true
      : false
  const { control, handleSubmit } = useForm({
    defaultValues: {
      nombre: modelValues?.nombre,
      identificador: modelValues?.identificador,
      activo: state,
      descripcion: modelValues?.descripcion,
      solicita_contrato: solicita_contrato,
    },
  })

  const isNewModel = idEdition === 'new'

  const { createModel, editModel, loadingUpdate } = useUpdateRequest({
    idModel: idEdition,
  })

  const onSubmit = (data) => {
    conditionalRequest(data, editModel, createModel, idEdition)
  }

  return (
    <Box
      sx={sxContainer}
      component='form'
      onSubmit={handleSubmit(onSubmit)}
    >
      <BackdropLoading loading={loadingUpdate} />
      <CustomAccordion
        defaultExpanded={true}
        title='Modelo'
        color='primary'
        backColor={'backgroundGrey2'}
      >
        <InputsModel control={control} />
      </CustomAccordion>
      {isNewModel ? (
        <Box>
          <Typography variant='h6'>
            Para agregar categorías y bloques primero se debe crear el modelo
          </Typography>
        </Box>
      ) : (
        <>
          <CategoryTable idEdition={idEdition} />
          <CustomAccordion
            title='Bloques'
            color='primary'
            backColor={'backgroundGrey2'}
          >
            <DatablocksAcordions idEdition={idEdition} />
          </CustomAccordion>
        </>
      )}
      <Box
        display='flex'
        justifyContent='flex-end'
        padding='20px'
        gap='10px'
      >
        <Button
          type='button'
          variant='contained'
          color='secondary'
          onClickCancel={() => navigate(`/applications/models`)}
        >
          Cancelar
        </Button>
        <Button
          type='submit'
          variant='contained'
          color='primary'
        >
          Guardar
        </Button>
      </Box>
    </Box>
  )
}

export default StepsToCreateAModel
