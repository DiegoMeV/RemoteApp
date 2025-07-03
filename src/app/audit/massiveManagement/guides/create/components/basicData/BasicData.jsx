import { GenericForm, ValueListGlobal } from '@/lib'
import { Box, Grid } from '@mui/material'
import { useInputsList } from './useInputsList'
import { LoadingMassive } from '@/app/audit/expedient/components'

const BasicData = ({ form, queueInfo }) => {
  const { inputsMassiveActivities, arrayModals } = useInputsList()
  const infoModal = arrayModals?.find((modal) => !!modal.openOptions.show)

  return (
    <Box
      position='relative'
      overflow='auto'
      pt={1}
    >
      <Grid
        container
        spacing={2}
        sx={{ overflow: 'auto' }}
      >
        <GenericForm
          inputs={inputsMassiveActivities}
          control={form.control}
        />
        <ValueListGlobal
          selectedOption={(params) => {
            form?.setValue(infoModal.name, params.row?.id)
          }}
          {...infoModal}
          searchOptions={infoModal?.searchOptions}
        />
        {['QUEUED', 'INPROGRESS'].includes(queueInfo?.[0]?.status) && (
          <LoadingMassive queueInfo={queueInfo} />
        )}
      </Grid>
    </Box>
  )
}

export default BasicData
