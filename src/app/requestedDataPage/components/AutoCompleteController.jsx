import React from 'react'
import { Controller } from 'react-hook-form'
import { Autocomplete, TextField } from '@mui/material'

const AutoCompleteController = ({ control, name, options, label }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          value={value ?? ''}
          options={options ?? []}
          getOptionLabel={(option) => option.title}
          onChange={(_, data) => onChange(data)}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              variant='outlined'
            />
          )}
        />
      )}
    />
  )
}

export default AutoCompleteController
