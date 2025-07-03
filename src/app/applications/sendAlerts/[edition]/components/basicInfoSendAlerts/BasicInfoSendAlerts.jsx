import {
  buildQueryStringUserService,
  useBoolean,
  useListModelsInfo,
  useSearch,
  useSearchHierarchy,
} from '@/lib'
import { ViewBasicInfoSendAlerts } from './views'

const BasicInfoSendAlerts = ({ control, setValue, idEdition }) => {
  const hirarchyModal = useBoolean()
  const hierarchySearch = useSearch()
  const modelModal = useBoolean()
  const modelSearch = useSearch()
  const qry = buildQueryStringUserService(10, null, hierarchySearch.searchText)
  const { data: hierarchies, isLoading: loadingHierarchies } = useSearchHierarchy({
    qry: qry,
  })
  const { data: models, isLoading: loadingModels } = useListModelsInfo({
    qry: buildQueryStringUserService(10, null, modelSearch.searchText),
  })
  const lovHierarchy = {
    data: hierarchies?.data,
    loading: loadingHierarchies,
    open: hirarchyModal,
    searchOptions: hierarchySearch,
    columns: [{ field: 'name', headerName: 'Nombre de la dependencia', width: 400 }],
    selectedOption: (params) => {
      setValue('dep_destino', params.row)
    },
  }
  const lovModel = {
    data: models?.data,
    loading: loadingModels,
    open: modelModal,
    searchOptions: modelSearch,
    columns: [{ field: 'nombre', headerName: 'Nombre del modelo', width: 400 }],
    selectedOption: (params) => {
      setValue('modelo', params.row)
    },
  }

  return (
    <ViewBasicInfoSendAlerts
      control={control}
      lovHierarchy={lovHierarchy}
      setValue={setValue}
      idEdition={idEdition}
      lovModel={lovModel}
    />
  )
}

export default BasicInfoSendAlerts
