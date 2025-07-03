import {
  GenericAutocomplete,
  ValueListGlobal,
  useBoolean,
  useGlobalVaribles,
  useMutationDynamicBaseUrl,
  useSearch,
} from '@/lib'
import { useColumnsAutoComplete } from '../../hooks'
import toast from 'react-hot-toast'
import { useMemo, useState, forwardRef } from 'react'
import { useCollectFormData } from './hooks'

const AutocompleteDynamic = forwardRef(function AutocompleteDynamic(
  {
    form,
    label,
    rowId,
    value,
    error,
    helperText,
    autoCompleteConfig,
    isEdit,
    id,
    textFieldProps,
    isANewRow,
    blockId,
    disabled,
    items,
    newDataDetail,
    event,
    typeEvent,
  },
  ref
) {
  const [row, setRows] = useState([])
  const rowsUpdated = useMemo(() => {
    return row?.map((item) => ({
      ...item,
      UUID: crypto.randomUUID(),
    }))
  }, [row])
  const [errorLoV, setErrorLoV] = useState('')
  const search = useSearch()
  const [model, setModel] = useState({ page: 0, pageSize: 50 })
  const getGlobalVariables = useGlobalVaribles()
  const modalAutocompleteDinamicList = useBoolean()
  const columns = autoCompleteConfig?.columns || []

  const globalVariables = useMemo(() => getGlobalVariables({}), [getGlobalVariables])

  const url_data_source = autoCompleteConfig?.url_data_source
    ?.replace('{idCompany}', globalVariables?.idCompany)
    ?.replace('{querySearch}', '')

  const { mutateAsync: getDataLOV, isPending: isGetDataLOV } = useMutationDynamicBaseUrl({
    baseKey: url_data_source ? '' : 'urlApps',
    url: url_data_source ?? `/LOV/${autoCompleteConfig?.idLov}/execute`,
    isCompanyRequest: true,
    method: url_data_source ? 'get' : 'post',
    onSuccess: (e) => {
      setErrorLoV('')
      setRows(e?.data)

      if (isEdit && e?.data) {
        const valuesAuto = rowId
          ? form.watch(`${blockId}.${rowId}.${id}`)
          : form.watch(`${blockId}.${id}`)

        const newValues = e?.data?.find((e) => e?.[id] === valuesAuto)

        autoCompleteConfig?.setter?.forEach((setter) => {
          if (autoCompleteConfig?.valueOption !== setter?.getKey) {
            const [newBlockId, newRowId] = setter?.setKey?.split('.') || []
            const key = rowId ? `${newBlockId}.${rowId}.${newRowId}` : setter?.setKey
            form.setValue(key, newValues?.[setter?.getKey])
          }
        })
      }
    },
    onError: (e) => {
      setErrorLoV(e?.response?.data?.error)
      toast.error(e?.response?.data?.error)
    },
  })

  const { handleClickOpenLov, selectedOption, handlePaginationModelChange, handleSearch } =
    useCollectFormData({
      autoCompleteConfig,
      globalVariables,
      form,
      rowId,
      modalAutocompleteDinamicList,
      getDataLOV,
      isEdit,
      isANewRow,
      blockId,
      url_data_source,
      id,
      items,
      model,
      setModel,
      newDataDetail,
      value,
      search,
      event,
      typeEvent,
    })

  const newColumns = useColumnsAutoComplete({ data: columns })

  const findValue = useMemo(
    () =>
      value?.[autoCompleteConfig?.valueOption]
        ? value
        : rowsUpdated?.find((e) => e?.[autoCompleteConfig?.valueOption] === value),
    [rowsUpdated, autoCompleteConfig, value]
  )

  return (
    <>
      <GenericAutocomplete
        ref={ref} // Pasar el ref a GenericAutocomplete
        value={findValue}
        autocompleteProps={{
          openModal: handleClickOpenLov,
          options: rowsUpdated || [],
          onChange: (_, params) => {
            selectedOption(params)
          },
          startAdornment: disabled ? false : null,
          loadingValue: isGetDataLOV,
          disabled: isGetDataLOV || disabled,
          getOptionLabel: (option) => option?.[autoCompleteConfig?.labelOption],
          isOptionEqualToValue: (option, value) =>
            option?.[autoCompleteConfig?.valueOption] === value?.[autoCompleteConfig?.valueOption],
        }}
        textFieldProps={{
          ...textFieldProps,
          error: error || errorLoV?.length,
          helperText: helperText || errorLoV,
          label: label,
        }}
      />
      <ValueListGlobal
        openOptions={modalAutocompleteDinamicList}
        columns={newColumns || []}
        rows={rowsUpdated || []}
        loading={isGetDataLOV}
        title='Lista de valores'
        selectedOption={selectedOption}
        searchOptions={search}
        handleSearch={handleSearch}
        pagination={{
          paginationModel: model,
          handlePaginationModelChange,
          rowCountState: row?.[0]?.total_count,
        }}
        getRowId={(row) => row?.UUID}
      />
    </>
  )
})

export default AutocompleteDynamic
