import { GenericForm, useBoolean, useSearch, ValueListGlobal } from '@/lib'
import { useStoreState } from 'easy-peasy'
import { Box, Grid, TextField } from '@mui/material'
import { useInputsList } from '../funcs'
import { useGetAllParams } from '@/libV4'

const ViewStep0 = ({ idGroup, form }) => {
  const modalDependencies = useBoolean()
  const modalRegisteredProcess = useBoolean()
  const searchProcessType = useSearch()
  const searchJobTitleVL = useSearch()
  const params = useGetAllParams()
  const idProcessType = params?.idProcessType ?? null
  const { dependencies } = useStoreState((state) => state.user.userData || [])
  const { inputsList, checkList, arrayModals } = useInputsList(
    modalDependencies,
    modalRegisteredProcess,
    searchProcessType,
    searchJobTitleVL,
    idGroup,
    dependencies,
    idProcessType
  )
  const infoModal = arrayModals?.find((modal) => !!modal.openOptions.show)
  return (
    <Box
      bgcolor={'backgroundWhite1'}
      p={2}
      borderRadius={2}
    >
      <Grid
        container
        spacing={3}
      >
        <GenericForm
          inputs={inputsList}
          control={form?.control}
        />
        <ValueListGlobal
          {...infoModal}
          selectedOption={(params) => {
            form?.setValue(infoModal.name, params.row)
          }}
          searchOptions={infoModal?.searchOptions}
        />

        <Grid
          item
          md={4}
        >
          <GenericForm
            inputs={checkList}
            control={form?.control}
          />
        </Grid>
        <Grid
          item
          md={8}
        >
          <TextField
            {...form?.register('observations')}
            label='Observaciones'
            multiline
            minRows={8}
            maxRows={8}
            fullWidth
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default ViewStep0
