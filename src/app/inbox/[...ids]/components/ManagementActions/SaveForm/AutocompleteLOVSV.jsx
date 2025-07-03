import { GenericAutocomplete, useBoolean, ValueListGlobal } from '@/lib'

const AutocompleteLOVSV = ({ elementAction, field, error }) => {
  const options = elementAction?.actionItemSpecs?.options.map((option) => {
    return {
      ...option,
      id: option?.label,
    }
  })

  const getOptionLabel = (option) => option?.label
  const isOptionEqualToValue = (option, value) => option?.value === value?.value

  const value = options.find((option) => option.value === field.value)
  const label = `${elementAction?.name} ${elementAction?.isRequired ? '*' : ''}`
  const helperText = error ? error.message : elementAction?.description ?? ''

  const onChange = (_, newValue) => {
    field.onChange(newValue?.value ?? null)
  }

  const LovModal = useBoolean()

  return (
    <>
      <GenericAutocomplete
        autocompleteProps={{
          options,
          getOptionLabel,
          isOptionEqualToValue,
          value,
          onChange,
          openModal: LovModal.handleShow,
        }}
        textFieldProps={{ label, helperText, error: !!error }}
      />
      <ValueListGlobal
        openOptions={LovModal}
        rows={options}
        columns={[
          {
            field: 'label',
            headerName: 'Nombre',
            flex: 1,
          },
        ]}
        selectedOption={(params) => field.onChange(params.row.value)}
      />
    </>
  )
}

export default AutocompleteLOVSV
