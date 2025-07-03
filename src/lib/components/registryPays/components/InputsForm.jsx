import { GenericForm, ValueListGlobal, useBoolean, useSearch } from '@/lib'
import { Grid } from '@mui/material'
import { useInputsList } from '../funcs'
import TableForm from './TableForm'
import { useStoreState } from 'easy-peasy'

const InputsForm = ({ form, idGroup, columnsTable, apiRef, requiredOption, labelButton }) => {
  const modalDependencies = useBoolean()
  const modalRegisteredProcess = useBoolean()
  const searchProcessType = useSearch()
  const { dependencies } = useStoreState((state) => state.user.userData || [])
  const { inputsList, arrayModals } = useInputsList(
    modalDependencies,
    modalRegisteredProcess,
    searchProcessType,
    idGroup,
    dependencies
  )
  const infoModal = arrayModals?.find((modal) => !!modal.openOptions.show)
  return (
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
      <TableForm
        form={form}
        columnsTable={columnsTable}
        apiRef={apiRef}
        requiredOption={requiredOption}
        labelButton={labelButton}
      />
    </Grid>
  )
}

export default InputsForm
