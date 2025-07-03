import { BackdropLoading } from '@/lib'
import { Box, Button, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { BlockInfo, VariablesBlock } from '.'
import { useRequestsBlock } from '../funcs'

const FormBlock = ({ infoBlock, idEdition }) => {
  const blockVariables = infoBlock?.data?.[0] || {}
  const { handleSubmit, control } = useForm({
    defaultValues: {
      nombre: blockVariables?.nombre,
      descripcion: blockVariables?.descripcion,
    },
  })
  const isNewBlock = idEdition === 'new'

  const { createBlock, editBlock, loadingUpdate } = useRequestsBlock({ idBlock: idEdition })

  const onSubmit = (data) => {
    if (isNewBlock) {
      createBlock(data)
      return
    }
    editBlock(data)
  }
  return (
    <Box
      component='form'
      position='relative'
      onSubmit={handleSubmit(onSubmit)}
      p='10px 20px'
      backgroundColor='backgroundGrey1'
      height='calc(100vh - 150px)'
    >
      <Box
        overflow='auto'
        height='calc(100vh - 250px)'
      >
        <BackdropLoading loading={loadingUpdate} />
        <BlockInfo control={control} />
        {isNewBlock ? (
          <Box>
            <Typography variant='h6'>
              Para agregar variables primero se debe crear el bloque
            </Typography>
          </Box>
        ) : (
          <VariablesBlock
            idEdition={idEdition}
            control={control}
          />
        )}
      </Box>
      <Button
        variant='contained'
        sx={{
          position: 'absolute',
          bottom: { xs: '15px', sm: '20px' },
          right: '50%',
          transform: 'translateX(50%)',
        }}
        type='submit'
      >
        {isNewBlock ? 'Crear bloque' : 'Guardar cambios'}
      </Button>
    </Box>
  )
}

export default FormBlock
