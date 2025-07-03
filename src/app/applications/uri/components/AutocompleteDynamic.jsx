import {
  AutocompleteNoForm,
  ValueListGlobal,
  useBoolean,
  useQueryDynamicApi,
  useSearch,
} from '@/lib'
import { useColumnsAutoComplete } from '../hooks'
import { useState, useEffect } from 'react'
import { useStoreState } from 'easy-peasy'

const AutocompleteDynamic = ({ onChange, label, value, columns, error, helperText, qryConfig }) => {
  const companyData = useStoreState((state) => state.company.companyData)
  const idCompany = companyData?.companyId
  const [url, setUrl] = useState('')

  const modalAutocompleteDinamicList = useBoolean()
  const searchData = useSearch()

  useEffect(() => {
    let newUrl = qryConfig.url_data_source
    const params = {
      ...qryConfig.defaultParams,
      querySearch: searchData.searchText,
      idCompany: idCompany,
    }

    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined) {
        newUrl = newUrl.replace(new RegExp(`{${key}}`, 'g'), params[key])
      }
    })

    setUrl(newUrl)
  }, [searchData.searchText, qryConfig, idCompany])

  const { data: dataQuery, isLoading } = useQueryDynamicApi({ url })

  const selectedOption = (params) => {
    onChange(params?.row?.id)
  }

  const newColumns = useColumnsAutoComplete({ data: columns })

  const selectedValue = dataQuery?.data?.find((option) => option.id === value)

  const handleIdData = (params) => {
    onChange(params?.id)
  }

  return (
    <>
      <AutocompleteNoForm
        openModal={modalAutocompleteDinamicList.handleShow}
        label={label}
        options={dataQuery?.data || []}
        getOptionLabel={(option) => option[qryConfig.labelOption]}
        isLoading={isLoading}
        handleSearch={searchData.handleSearchText}
        onChange={handleIdData}
        error={error}
        helperText={helperText}
        value={selectedValue}
        setter={qryConfig?.setter}
      />
      <ValueListGlobal
        openOptions={modalAutocompleteDinamicList}
        columns={newColumns || []}
        searchOptions={searchData}
        rows={dataQuery?.data || []}
        loading={isLoading}
        title='Lista de valores'
        selectedOption={selectedOption}
      />
    </>
  )
}

export default AutocompleteDynamic
