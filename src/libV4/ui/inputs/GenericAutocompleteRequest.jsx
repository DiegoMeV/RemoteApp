import { useQueryDynamicApi } from '../../api'
import GenericAutocomplete from './GenericAutocomplete'
import { buildingURL, useSearch } from './funcs'
import { forwardRef } from 'react'
import { useStoreActions } from 'easy-peasy'

const GenericAutocompleteRequest = forwardRef(function GenericAutocompleteRequest(
  { requestprops, vlprops, queryRequest, ...rest },
  ref
) {
  // const { setVLProps } = useRootStore()
  const setVLProps = useStoreActions((actions) => actions.newValueList.setVLProps)

  const autocompletepropsorigin = rest?.autocompleteprops ?? {}

  const searchParam = useSearch()

  const url = buildingURL(requestprops?.url, queryRequest, requestprops, searchParam)

  const { data: options, isLoading: loadingoptions } = useQueryDynamicApi({ ...requestprops, url })

  const selectedOption = (params) => {
    rest?.onChange?.(null, params)
  }

  const openmodal = () => {
    setVLProps({
      open: true,
      selectedOption: selectedOption,
      requestParams: requestprops,
      queryRequest,
      ...vlprops,
    })
  }

  const autocompleteprops = {
    options: options?.data ?? [],
    openmodal,
    loadingoptions,
    filterOptions: (options) => options,
    ...autocompletepropsorigin,
  }

  const textfieldprops = {
    label: rest?.label,
    onChange: (e) => {
      searchParam?.handleChange(e?.target?.value)
    },
    ...rest?.textfieldprops,
  }
  return (
    <GenericAutocomplete
      {...rest}
      ref={ref}
      autocompleteprops={autocompleteprops}
      textfieldprops={textfieldprops}
    />
  )
})
GenericAutocompleteRequest.displayName = 'GenericAutocompleteRequest'

export default GenericAutocompleteRequest
