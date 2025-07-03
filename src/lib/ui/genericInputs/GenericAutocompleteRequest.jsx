import { useQueryDynamicApi } from '@/lib/api'
import { useStoreActions } from 'easy-peasy'
import GenericAutocomplete from './GenericAutocomplete'
import { useSearch } from '@/lib/components'
import { qryBuilder } from './funcs'
import { forwardRef } from 'react'

const GenericAutocompleteRequest = forwardRef(function GenericAutocompleteRequest(
  { requestProps, vlProps, queryRequest, ...rest },
  ref
) {
  const setVLProps = useStoreActions((actions) => {
    return actions.valueList.setVLProps
  })
  const autocompletePropsOrigin = rest?.autocompleteProps ?? {}
  const searchParam = useSearch()

  const requestOnInput = requestProps?.requestOnInput ?? false

  const filterBy = vlProps?.queryRequest?.querySearch ?? queryRequest?.querySearch ?? ''

  const url = qryBuilder(requestProps.url, filterBy, searchParam)

  const { data: options, isLoading: loadingOptions } = useQueryDynamicApi({
    ...requestProps,
    url,
    ...(requestOnInput && { enabled: searchParam?.searchText?.length > 0 }),
  })

  const selectedOption = (params) => {
    rest?.onChange?.(null, params?.row)
  }

  const openModal = () => {
    setVLProps({
      open: true,
      loading: loadingOptions,
      rows: options,
      selectedOption: selectedOption,
      requestParams: { ...requestProps },
      queryRequest,
      ...vlProps,
    })
  }

  const autocompleteProps = {
    options: options?.data || [],
    openModal,
    loadingOptions,
    getOptionLabel: (option) =>
      option?.name ||
      option?.nombre ||
      `${option?.firstName ?? ''} ${option?.lastName ?? ''} ` ||
      '',
    ...autocompletePropsOrigin,
  }

  const textfieldProps = {
    label: rest?.label,
    onChange: (e) => searchParam?.handleSearchText(e?.target?.value),
    ...rest?.textfieldProps,
  }
  return (
    <GenericAutocomplete
      {...rest}
      ref={ref}
      autocompleteProps={autocompleteProps}
      textFieldProps={textfieldProps}
    />
  )
})

GenericAutocompleteRequest.displayName = 'GenericAutocompleteRequest'

export default GenericAutocompleteRequest
