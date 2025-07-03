import { GenericForm, ValueListGlobal } from '@/lib'
import { Box, Grid } from '@mui/material'
import { useInputsEndogen } from './useInputsEndogen'
import { LoadingMassive } from '@/app/audit/expedient/components'

const BasicData = ({ form, idInspectionPlan, queueInfo }) => {
  const { inputEndogen, arrayModals } = useInputsEndogen({
    form,
    idInspectionPlan,
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
          inputs={inputEndogen}
          control={form.control}
        />
        <ValueListGlobal
          selectedOption={(params) => {
            form?.setValue(infoModal.name, params.row.id)
          }}
          {...infoModal}
          searchOptions={infoModal?.searchOptions}
        />
      </Grid>
      {['QUEUED', 'INPROGRESS', 'IN_PROGRESS'].includes(
        queueInfo?.[0]?.status || queueInfo?.[0]?.estado
      ) && <LoadingMassive queueInfo={queueInfo} />}
    </Box>
  )
}

export default BasicData
