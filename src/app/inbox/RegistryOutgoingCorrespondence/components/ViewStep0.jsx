import { GenericForm, useBoolean, useSearch, ValueListGlobal } from '@/lib'
import { useStoreState } from 'easy-peasy'
import { useInputsList } from '../funcs'
import { Box, Grid } from '@mui/material'

const ViewStep0 = ({ idGroup, form }) => {
  const modalDependencies = useBoolean()
  const modalRegisteredProcess = useBoolean()
  const searchProcessType = useSearch()
  const searchJobTitleVL = useSearch()
  const { dependencies } = useStoreState((state) => state.user.userData || [])
  const { inputsList, arrayModals } = useInputsList(
    modalDependencies,
    modalRegisteredProcess,
    searchProcessType,
    searchJobTitleVL,
    idGroup,
    dependencies
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
      </Grid>
    </Box>
  )
}

export default ViewStep0
