import {
  GenericForm,
  ValueListGlobal,
  buildQueryAlerts,
  useAllProcessTypeByGroup,
  useBoolean,
  useGetAlertModels,
  useProcessTypeByGroup,
  useQueryDynamicApi,
  useSearch,
} from '@/lib'
import { useStoreState } from 'easy-peasy'
import { buildArrayOfModals, inputsStepOne } from '../funcs'
import { selectVL } from '../funcs/selectVL'
import { useEffect, useState } from 'react'
import { searchRows } from '@/app/applications/hooks'

const StepOne = ({ form, ids }) => {
  const idGroup = ids?.idGroup ?? null
  const modalAlertsModels = useBoolean()
  const modalRegisteredProcess = useBoolean()
  const modalDependencies = useBoolean()
  const searchProcessType = useSearch()
  const searchAlertsModel = useSearch()

  const qryDOAlerts = buildQueryAlerts(10, 0, searchAlertsModel?.searchText)

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
  const { data: processGroupsData } = useProcessTypeByGroup({ qry: `/${idGroup}` })

  const officeId = form?.watch('office')?.id

  const { data: alertModels, isLoading: loadingAlertModels } = useGetAlertModels({
    qry: qryDOAlerts,
  })

  const { data: registeredProcess, isLoading: loadingRegisteredProcess } = useQueryDynamicApi({
    baseKey: 'urlProcess',
    url: `/processes?idOfficeOrigin=${officeId}&idProcessTypeGroup=${processGroupsData?.data?.[0]?.id}`,
    isCompanyRequest: true,
    enabled: !!officeId && !!processGroupsData?.data?.[0]?.id,
  })

  const inputs = inputsStepOne({
    modalDependencies,
    dependencies,
    modalRegisteredProcess,
    processTypesFiltered,
    searchProcessType,
    loadingProcessTypes,
    alertModels,
    loadingAlertModels,
    registeredProcess,
    loadingRegisteredProcess,
    modalAlertsModels,
    searchAlertsModel,
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
    modalAlertsModels,
    alertModels,
    searchAlertsModel,
    loadingAlertModels,
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
