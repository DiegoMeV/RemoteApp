import { GenericForm, useBoolean, useSearch, ValueListGlobal } from '@/lib'
import { Box, Grid } from '@mui/material'
import { useInputsList } from './useInputsList'
import { LoadingMassive } from '@/app/audit/expedient/components'

const BasicData = ({ form, queueInfo }) => {
  const modalRegisteredProcess = useBoolean()
  const searchProcessType = useSearch()
  const { inputExogen, arrayModals } = useInputsList({
    modalRegisteredProcess,
    searchProcessType,
    form,
  })
  const infoModal = arrayModals?.find((modal) => !!modal.openOptions.show)

  return (
    <Box
      position='relative'
      overflow='auto'
      pt={1}
    >
      <Grid
        container
        spacing={3}
      >
        <GenericForm
          inputs={inputExogen}
          control={form.control}
        />
        <ValueListGlobal
          {...infoModal}
          selectedOption={(params) => {
            form?.setValue(infoModal.name, params?.row?.id)
          }}
          searchOptions={infoModal?.searchOptions}
        />
      </Grid>
      {['QUEUED', 'INPROGRESS'].includes(queueInfo?.[0]?.status) && (
        <LoadingMassive queueInfo={queueInfo} />
      )}
    </Box>
  )
}

export default BasicData
