import { Box, Button, Grid } from '@mui/material'
import { useForm } from 'react-hook-form'
import { BackdropLoading } from '@/lib'
import { BasicInputs } from '.'
import { useNavigate } from 'react-router-dom'
import { useEditGroupFunctions } from '../hooks'
import { TitleAdmin } from '../../../components'
import { useQueryClient } from '@tanstack/react-query'

const GeneralInfo = ({ idApplication, idGroup, dataGroup }) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { control, handleSubmit } = useForm({
    defaultValues: { name: dataGroup?.name, isEnabled: dataGroup?.isEnabled },
  })

  const { editGroup, createGroup, isLoading } = useEditGroupFunctions(idGroup)

  const onSubmit = async (data) => {
    if (idGroup === 'new') {
      await createGroup({ idApplication: idApplication, ...data })
    } else {
      queryClient.invalidateQueries([`process-type-groups/`])
      await editGroup({ idApplication: idApplication, ...data })
    }
  }

  return (
    <Box
      component='form'
      display='flex'
      flexDirection='column'
      backgroundColor='backgroundGrey1'
      borderRadius='10px 10px 0 0'
      onSubmit={handleSubmit(onSubmit)}
    >
      <BackdropLoading loading={isLoading} />
      <TitleAdmin
        title={
          idGroup === 'new'
            ? 'Creación de grupo de tipos de procesos'
            : 'Edición de grupo de tipos de procesos'
        }
        back={true}
        backpath={`/applications/process/${idApplication}`}
      >
        <BasicInputs control={control} />
      </TitleAdmin>
      <Grid
        container
        padding='20px'
        spacing={2}
      >
        <Grid
          item
          xs={12}
        >
          {/* TODO: <Controller
            name='description'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Descriptición'
                size='small'
                fullWidth
                multiline
                rows={4}
                InputLabelProps={{ shrink: true }}
                sx={{ backgroundColor: 'backgroundWhite1' }}
              />
            )}
          /> */}
        </Grid>
        <Grid
          item
          xs={8}
        >
          {/* TODO : <TextField
        label='Tipo de vista'
        size='small'
        select
        fullWidth
        InputLabelProps={{ shrink: true }}
        sx={{ backgroundColor: 'backgroundWhite1' }}
      >
        <MenuItem value='V1'>Vista 1</MenuItem>
        <MenuItem value='V2'>Vista 2</MenuItem>
      </TextField> */}
        </Grid>
        <Grid
          item
          container
          xs={4}
          justifyContent='flex-end'
          columnGap='20px'
        >
          <Button
            color='error'
            variant='contained'
            onClick={() => navigate(`/applications/process/${idApplication}`)}
          >
            Cancelar
          </Button>
          <Button
            variant='contained'
            type='submit'
          >
            Guardar
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default GeneralInfo
