import { useStoreState } from 'easy-peasy'

import { useEffect, useState } from 'react'
import { searchRows } from '@/app/applications/hooks'
import { buildArrayOfModals, inputsStepOne } from '../funcs'
import { useAllProcessTypeByGroup } from '@/lib/api'
import { GenericForm, useBoolean, ValueListGlobal } from '@/lib/ui'
import { useSearch } from '../../searchTable'

const selectVL = (modals) => {
  return modals?.find((modal) => !!modal.openOptions.show)
}

const StepOne = ({ form, ids }) => {
  const idGroup = ids?.idGroup ?? null
  const modalRegisteredProcess = useBoolean()
  const modalDependencies = useBoolean()
  const searchProcessType = useSearch()

  const { dependencies } = useStoreState((state) => state.user.userData || [])

  const { data: processTypes, isLoading: loadingProcessTypes } = useAllProcessTypeByGroup({
    idGroup,
    allProcessTypes: false,
    enabled: !!idGroup,
  })
  const [processTypesFiltered, setProcessTypesFiltered] = useState([])
  useEffect(() => {
    searchRows(searchProcessType?.searchText, processTypes?.data, setProcessTypesFiltered)
  }, [searchProcessType?.searchText, processTypes?.data])

  const inputs = inputsStepOne({
    dependencies,
    processTypesFiltered,
    loadingProcessTypes,
    searchProcessType,
    modalRegisteredProcess,
    modalDependencies,
  })
  const selectAutocompleteValue = (name, newValue) => {
    form?.setValue(name, newValue)
  }
  const arrayModals = buildArrayOfModals({
    modalDependencies,
    dependencies,
    modalRegisteredProcess,
    processTypesFiltered,
    searchProcessType,
    loadingProcessTypes,
  })

  const infoModal = selectVL(arrayModals)
  return (
    <>
      <GenericForm
        inputs={inputs}
        control={form?.control}
      />
      <ValueListGlobal
        {...infoModal}
        selectedOption={(params) => {
          selectAutocompleteValue(infoModal.name, params.row)
        }}
        searchOptions={infoModal?.searchOptions}
      />
    </>
  )
}

export default StepOne
