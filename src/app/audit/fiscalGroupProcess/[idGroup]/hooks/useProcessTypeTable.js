import { useCallback, useEffect, useState } from 'react'
import { processTypeColumns } from '../components/ProcessTypeColumns'
import { useNavigate } from 'react-router-dom'

const useProcessTypeTable = (processTypes) => {
  const navigate = useNavigate()

  const [rows, setRows] = useState([])

  const handleRouterToConstructor = (row) => {
    navigate(`/fiscalBuilder/${row.id}`)
  }

  const handleRouterToEdit = (row) => {
    navigate(`/audit/fiscalGroupProcess/editTypeProcess/${row.idGroup}/${row.id}`)
  }

  const columns = processTypeColumns(handleRouterToEdit, handleRouterToConstructor)

  const convertInformationToRows = useCallback(() => {
    const structuredRows = processTypes?.map((cell) => {
      return {
        id: cell?.id || '',
        nameProcessType: cell?.name || '',
        idGroup: cell?.idGroup || '',
        isActive: cell?.isEnabled || '',
        description: cell?.description || '',
        options: 'option',
      }
    })
    setRows(structuredRows)
  }, [processTypes, setRows])

  useEffect(() => {
    if (processTypes && processTypes.length !== 0) {
      convertInformationToRows()
    } else {
      setRows([])
    }
  }, [processTypes, convertInformationToRows, setRows])
  return { columns, rows }
}

export default useProcessTypeTable
