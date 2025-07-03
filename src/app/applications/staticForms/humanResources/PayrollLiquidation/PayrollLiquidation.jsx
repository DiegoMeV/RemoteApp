import { useGlobalVaribles, useSearch } from '@/lib'
import { columnsPayrollTable, infoNomina } from './constants'
import { ViewPayrollLiquidation } from './views'
import { useOracleExecutes } from '@/libV4'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PayrollLiquidation = () => {
  const searchNomina = useSearch()
  const navigate = useNavigate()
  const getGlobalVariables = useGlobalVaribles()
  const { nit_compania } = getGlobalVariables()
  const { getQueryResult, isPendingQuery } = useOracleExecutes()
  const [rowsNomina, setRowsNomina] = useState([])
  const columns = columnsPayrollTable(navigate)

  const handleAdd = () => {
    navigate(
      '/applications/staticForms/humanResources/PayrollLiquidation/editPayrollLiquidation?isNew=true'
    )
  }

  const handleGetData = async (searchText) => {
    try {
      const queryNomina = infoNomina({ nit_compania, busqueda: searchText })
      const response = await getQueryResult(queryNomina)
      setRowsNomina(response)
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

    if (infoNomina) fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ViewPayrollLiquidation
      rows={rowsNomina?.data}
      columns={columns}
      isPendingQuery={isPendingQuery}
      searchNomina={searchNomina}
      handleAdd={handleAdd}
      handleGetData={handleGetData}
    />
  )
}

export default PayrollLiquidation
