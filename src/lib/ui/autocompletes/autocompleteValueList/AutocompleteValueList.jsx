import { ValueList } from '../../modals'
import AutocompleteControl from './AutocompleteControl'

const AutocompleteValueList = ({
  autocompleteStyles,
  controlModal,
  control,
  name,
  md,
  label,
  options,
  loading,
  searchText,
  setValue,
  columns,
  pagination,
  disabled,
  getValues,
  toggleDisabled = () => {},
  getLabel,
  required,
  errorMsj,
  valueId,
}) => {
  return (
    <>
      <AutocompleteControl
        style={autocompleteStyles ?? {}}
        onClick={() => controlModal?.handleShow()}
        name={name}
        control={control}
        md={md}
        label={label}
        options={options?.data}
        isLoading={loading}
        handleSearchText={searchText?.handleSearchText ?? null}
        setValue={setValue}
        disabled={disabled}
        getValues={getValues}
        toggleDisabled={toggleDisabled}
        getLabel={getLabel}
        required={required}
        errorMsj={errorMsj}
        valueId={valueId}
      />
      <ValueList
        loading={loading}
        openOptions={controlModal}
        columns={columns}
        rows={options?.data ?? []}
        selectedOption={(newValue) => {
          setValue?.(name, newValue)
          getValues?.(newValue)
        }}
        searchOptions={searchText}
        pagination={pagination}
        toggleDisabled={toggleDisabled}
      />
    </>
  )
}

export default AutocompleteValueList
