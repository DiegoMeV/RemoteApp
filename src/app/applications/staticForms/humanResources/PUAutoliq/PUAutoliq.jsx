import { useGlobalVaribles, useSearch } from '@/lib'
import { ViewPUAutoliq } from './views'
import { useNavigate } from 'react-router-dom'
import { useOracleExecutes } from '@/libV4'
import { useEffect, useState } from 'react'
import { columnsPlanillaTable, infoTablePlanilla } from './constants'

const PUAutoliq = () => {
  const searchNomina = useSearch()
  const navigate = useNavigate()
  const getGlobalVariables = useGlobalVaribles()
  const { nit_compania } = getGlobalVariables()
  const { getQueryResult, isPendingQuery } = useOracleExecutes()
  const [rowsPlanilla, setRowsPlanilla] = useState([])
  const columns = columnsPlanillaTable(navigate)

  const handleAdd = () => {
    navigate('/applications/staticForms/humanResources/PUAutoliq/editPUAutoliq?isNew=true')
  }

  const handleGetData = async (searchText) => {
    try {
      const queryNomina = infoTablePlanilla({ nit_compania, busqueda: searchText })
      const response = await getQueryResult(queryNomina)
      setRowsPlanilla(response)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        handleGetData(searchNomina?.searchText)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    if (infoTablePlanilla) fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ViewPUAutoliq
      rows={rowsPlanilla?.data}
      columns={columns}
      isPendingQuery={isPendingQuery}
      searchNomina={searchNomina}
      handleAdd={handleAdd}
      handleGetData={handleGetData}
    />
  )
}

export default PUAutoliq
