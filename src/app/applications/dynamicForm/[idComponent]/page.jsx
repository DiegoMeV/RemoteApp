import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useGetAllParams, useGlobalVaribles } from '@/lib'
import { ViewDynamicForm } from './views'
import { useColumns, useDataComponents, useHandleDelete } from './hooks'
import { getTableOptions, prepareDataComponent } from './funcs'
import { useEffect, useState } from 'react'

const IdComponent = () => {
  const { idForm } = useParams()
  const [searchParameter, setSearchParam] = useState('')
  const { idApplication, ...restParams } = useGetAllParams()
  const navigation = useNavigate()
  const [model, setModel] = useState({ page: 0, pageSize: 50 })
  const [queryData, setQueryData] = useState([])

  const [searchParams] = useSearchParams()
  const itemId = searchParams.get('itemId')

  const getGlobalVariables = useGlobalVaribles()
  const { idCompany, nit_compania } = getGlobalVariables({})
  const queryParams = new URLSearchParams(restParams).toString()

  const { getDataComponent, dataComponent, isLoadingComponent, isError, isPendingList } =
    useDataComponents({
      idApplication,
      idCompany,
      idForm,
      model,
      setQueryData,
      restParams,
      nit_compania,
      searchParameter,
    })

  const { title, rowsWithId, idComponentForm } = prepareDataComponent(dataComponent, queryData)
  const pageCount = queryData?.count
  const { addAllowed, editAllowed, deleteAllowed } = getTableOptions(dataComponent)
  const { confirmDelete, isDeleting } = useHandleDelete({
    refetch: getDataComponent,
    pksProps: {
      inputArray: dataComponent?.data?.[0]?.lastVersionInfo?.specification?.columns || [],
      pkProperty: 'pk',
      identifierProperty: 'column',
    },
    dbTable: dataComponent?.data?.[0]?.lastVersionInfo?.specification?.dbTable,
  })

  const columns = useColumns({
    prevData: dataComponent?.data?.[0]?.lastVersionInfo?.specification?.columns,
    idComponentForm,
    idForm,
    navigation,
    idApplication,
    restParams,
    editAllowed,
    deleteAllowed,
    confirmDelete,
  })

  const addNewData = () => {
    let path = `/applications/dynamicForm/${idForm}/${idComponentForm}/${idApplication}`
    if (path) {
      path += `?${queryParams}`
    }
    navigation(path)
  }

  useEffect(() => {
    if (queryParams) getDataComponent()
  }, [getDataComponent, model.pageSize, model.page, queryParams])

  useEffect(() => {
    setSearchParam('')
  }, [itemId])

  const props = {
    columns: columns || [],
    isLoading: isLoadingComponent || isPendingList || isDeleting,
    rows: rowsWithId || [],
    newTitle: title,
    isError: isError,
    addNewData: addNewData,
    setModel,
    model,
    pageCount: pageCount,
    searchParameter,
    setSearchParam,
    getDataComponent,
    addAllowed,
    editAllowed,
    deleteAllowed,
  }

  return <ViewDynamicForm {...props} />
}

export default IdComponent
