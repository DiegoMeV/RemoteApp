import { useEffect, useState } from 'react'
import { AutocompleteValueList } from '../autocompletes'
import { searchAlertRows } from '@/app/inbox/alertSubmission/[idGroup]/components/Form/Steps/funcs'

const LovInputRender = ({ item, control, setValue }) => {
  const {
    name,
    label,
    required,
    controlModal,
    searchText,
    options,
    columns,
    getValues,
    loading,
    funcRowAdditionalData = false,
  } = item

  const [completeRows, setCompleteRows] = useState({ data: [] })
  const [filteredRows, setFilteredRows] = useState({ data: [] })

  useEffect(() => {
    let rowsToSet = { data: options?.data ?? [] }

    if (options?.data && typeof funcRowAdditionalData === 'function') {
      rowsToSet = { data: options.data.map(funcRowAdditionalData) }
    }

    setCompleteRows(rowsToSet)
    setFilteredRows(rowsToSet)
  }, [options, funcRowAdditionalData])

  useEffect(() => {
    if (completeRows?.data) {
      searchAlertRows(searchText.searchText, completeRows.data, setFilteredRows)
    }
  }, [searchText.searchText, completeRows])

  return (
    <AutocompleteValueList
      autocompleteStyles={{
        '& .MuiInputBase-root': {
          backgroundColor: 'backgroundWhite1',
        },
      }}
      controlModal={controlModal}
      control={control}
      name={name}
      md={12}
      label={label}
      options={filteredRows ?? []}
      loading={loading}
      searchText={searchText}
      setValue={setValue}
      columns={columns}
      getValues={getValues}
      required={required}
    />
  )
}

export default LovInputRender
