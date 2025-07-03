import { Autocomplete, Grid, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import {
  findDependencyByLabel,
  handleChange,
  handleInputChange,
  updateDependencyInput,
  updateOptions,
  updateParentIdValue,
} from '../../hooks'

const AutocompleteDependencies = ({ control, setValue, allDependencies, dependency, required }) => {
  const [dependencyInput, setDependencyInput] = useState(dependency?.parentId ?? '')
  const [options, setOptions] = useState([])

  useEffect(() => {
    updateDependencyInput(allDependencies, dependency, setDependencyInput)
    updateOptions(required, allDependencies, dependency, setOptions)
    updateParentIdValue(setValue, dependencyInput)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allDependencies, dependency, required])

  useEffect(() => {
    setValue('parentId', findDependencyByLabel(dependencyInput, allDependencies)?.id ?? '')
  }, [dependencyInput, setValue, allDependencies])

  return (
    <Grid
      item
      xs={12}
    >
      <Controller
        control={control}
        name='parentId'
        render={({ field }) => (
          <Autocomplete
            {...field}
            fullWidth
            sx={{ backgroundColor: 'backgroundWhite1' }}
            noOptionsText='No hay dependencias'
            inputValue={dependencyInput}
            value={dependencyInput}
            onChange={(event, newValue) => handleChange(event, newValue, setValue)}
            onInputChange={(event, newInputValue) =>
              handleInputChange(event, newInputValue, setDependencyInput)
            }
            id='dependency-autocomplete-requirements'
            options={options}
            renderInput={(params) => (
              <TextField
                {...params}
                size={'small'}
                label='Selección de dependencia padre'
                required={required}
              />
            )}
          />
        )}
      />
    </Grid>
  )
}

export default AutocompleteDependencies
