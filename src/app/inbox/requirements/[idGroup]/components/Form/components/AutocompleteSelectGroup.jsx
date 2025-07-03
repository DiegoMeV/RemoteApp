import { Autocomplete, Grid, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import { structGroup } from '../../../funcs'

const AutocompleteSelectGroup = ({
  groups,
  setValue,
  control,
  setGroupSelected,
  currentValues,
}) => {
  const [options, setOptions] = useState([])
  const [chooseGroup, setChooseGroup] = useState(currentValues?.processGroup || null)

  useEffect(() => {
    if (groups) {
      structGroup(groups, setOptions)
    }
  }, [groups])

  const handleInputChange = (ev, newInputValue) => {
    setChooseGroup((prevGroup) => ({ ...prevGroup, name: newInputValue }));
  }

  const handleChange = (ev, newInputValue) => {
    setValue('processGroup', newInputValue)
    setGroupSelected(newInputValue)
  }

  return (
    <Grid
      item
      xs={12}
      md={4}
      px={2}
      pt={3}
    >
      <Controller
        name='processGroup'
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            noOptionsText='No existen grupos de aplicaciones'
            fullWidth
            options={options ?? []}
            getOptionLabel={(option) => option?.name || ''}
            groupBy={(option) => option?.parentName || ''}
            value={chooseGroup}
            inputValue={chooseGroup?.name || ''}
            isOptionEqualToValue={(option, value) => option?.name === value?.name}
            onChange={handleChange}
            onInputChange={handleInputChange}
            renderInput={(params) => (
              <TextField
                {...params}
                size={'small'}
                label='Seleccione un grupo'
                disabled={!groups}
                required={true}
              />
            )}
          />
        )}
      />
    </Grid>
  )
}

export default AutocompleteSelectGroup
