import { NoAccessCard, resizeColumns, useListCities, useSearch } from '@/lib'
import { ViewCities } from './views'
import { useEffect, useState } from 'react'
import { createQuery } from '../../funcs'
import { useNavigate } from 'react-router-dom'
import { columnsTableCities } from './funcs'
import { useGridApiRef } from '@mui/x-data-grid-premium'
import { AccessControl } from '@/libV4'

const Cities = () => {
  const [model, setModel] = useState({ page: 0, pageSize: 50 })
  const hasPrivilege = 'cgr.alertas.editar_municipios'
  const searchCities = useSearch()
  const qry = createQuery({ search: searchCities, model })
  const {
    data: cities,
    isLoading: loadingCities,
    isError: isErrorCities,
    isFetching: fechingCities,
  } = useListCities({ qry: qry })
  const navigate = useNavigate()
  const columns = columnsTableCities(navigate, hasPrivilege)
  const addNewCitie = () => navigate('/applications/ubication/cities/new')
  const apiRef = useGridApiRef()

  useEffect(() => {
    resizeColumns(apiRef, loadingCities)
  }, [cities, loadingCities, apiRef])
  return (
    <AccessControl
      privilege='cgr.alertas.visualizar_municipios'
      nodeContent={<NoAccessCard />}
    >
      <ViewCities
        cities={cities}
        isLoading={loadingCities || fechingCities}
        isError={isErrorCities}
        model={model}
        setModel={setModel}
        searchCities={searchCities}
        columns={columns}
        addNewCitie={addNewCitie}
        apiRef={apiRef}
      />
    </AccessControl>
  )
}

export default Cities
