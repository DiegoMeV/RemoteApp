import { useEffect, useState } from 'react'
import { handleChange, searchRows } from './funcs'

const useSearchRows = (rows, convertInfoRow) => {
  const [filteredRows, setFilteredRows] = useState(rows ?? [])
  const [completeRows, setCompleteRows] = useState(rows ?? [])

  const [searchText, setSearchText] = useState('')

  const onChange = (value) => handleChange(value, setSearchText)

  useEffect(() => {
    if (completeRows && completeRows.length > 0) {
      searchRows(searchText, completeRows, setFilteredRows)
    }
  }, [searchText, completeRows])

  useEffect(() => {
    if (rows && rows?.data?.length > 0) {
      convertInfoRow(rows, setCompleteRows, setFilteredRows)
    }
  }, [rows, convertInfoRow])

  return { filteredRows, onChange, searchText }
}

export default useSearchRows
