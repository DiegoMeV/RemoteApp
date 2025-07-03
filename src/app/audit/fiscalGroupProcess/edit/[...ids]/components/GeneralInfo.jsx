import { TitleAdmin } from '@/app/administration/components'
import { Box, Button, Grid } from '@mui/material'
import { useForm } from 'react-hook-form'
import { BackdropLoading, GenericForm, toArray } from '@/lib'
import { ContentArrColumns } from '.'
import { useNavigate } from 'react-router-dom'
import { useEditGroupFunctions } from '../hooks'
import { useQueryClient } from '@tanstack/react-query'
import { inputBasicGroups } from '../constants'

const GeneralInfo = ({ idGroup, dataGroup, refetch }) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: dataGroup?.name,
      isEnabled: dataGroup?.isEnabled,
      filingForm: dataGroup?.filingForm,
      taxType: dataGroup?.taxType,
      groupSpecs: {
        inboxProps: {
          columns: toArray(dataGroup?.groupSpecs?.inboxProps?.columns) ?? [],
        },
        historyConfig: {
          showAssignedMode: dataGroup?.groupSpecs?.historyConfig?.showAssignedMode ?? 'USER',
        },
      },
    },
  })

  const { editGroup, createGroup, isLoading } = useEditGroupFunctions(idGroup, setValue, refetch)

  const onSubmit = async (data) => {
    if (idGroup === 'new') {
      await createGroup({ ...data })
    } else {
      queryClient.invalidateQueries([`/process-type-groups`])
      await editGroup({ ...data })
    }
  }

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'backgroundGrey1',
        borderRadius: '10px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
      }}
    >
      <BackdropLoading loading={isLoading} />
      <TitleAdmin
        title={
          idGroup === 'new'
            ? 'Creación de grupo de tipos de procesos'
            : 'Edición de grupo de tipos de procesos'
        }
        back={true}
        backpath={`/audit/fiscalGroupProcess`}
      />
      <Grid
        container
        padding='20px'
        spacing={2}
      >
        <GenericForm
          inputs={inputBasicGroups ?? []}
          control={control}
        />
      </Grid>
      <ContentArrColumns control={control} />
      <Grid
        container
        padding='20px'
        spacing={2}
      >
        <Grid
          item
          container
          xs={12}
          justifyContent='flex-end'
          columnGap='20px'
        >
          <Button
            color='error'
            variant='contained'
            onClick={() => navigate(`/audit/fiscalGroupProcess`)}
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
