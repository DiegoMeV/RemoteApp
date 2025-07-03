import { ChooseInput } from '@/lib'
import { Grid } from '@mui/material'

const InputsBasicData = ({ control, lovHierarchy, setValue, idEdition, lovModel }) => {
  const fieldsValidation = () => {
    const inputs = [
      {
        name: 'dep_destino',
        label: 'Dependencia de destino',
        type: 'autoCompleteSelect',
        space: idEdition !== 'new' ? 6 : 4,
        required: true,
        data: lovHierarchy?.data,
        openModal: lovHierarchy?.open.handleShow,
        handleSearch: lovHierarchy?.searchOptions?.handleSearchText,
      },
      {
        name: 'id_modelo',
        label: 'Modelo',
        type: 'autoCompleteSelect',
        space: idEdition !== 'new' ? 6 : 4,
        required: true,
        data: lovModel?.data,
        openModal: lovModel?.open.handleShow,
        handleSearch: lovModel?.searchOptions?.handleSearchText,
      },
      {
        name: 'sigedoc_salida',
        label: 'SigeDoc de salida',
        type: 'text',
        space: idEdition !== 'new' ? 6 : 4,
      },
    ]
    if (idEdition !== 'new') {
      inputs.unshift({
        name: 'identificador',
        label: 'Identificador',
        type: 'text',
        space: 6,
        disabled: true,
      })
    }
    return inputs
  }
  const fields = fieldsValidation()
  return (
    <Grid
      container
      spacing={2}
      py={2}
    >
      {fields.map((field) => {
        return (
          <ChooseInput
            key={field.name}
            disabled={field.disabled}
            item={field}
            control={control}
            setValue={setValue}
          />
        )
      })}
    </Grid>
  )
}

export default InputsBasicData
