import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import { Autocomplete, LinearProgress, TextField } from '@mui/material'
import { buildQueryStringUserService, useAllUserInfo } from '@/lib'

const AutocompleteGetUsers = ({ control }) => {
  const [searchUser, setSearchUser] = useState('')

  const qry = buildQueryStringUserService(5, undefined, searchUser)
  const { data: usersInfo, isLoading: loadingUsers } = useAllUserInfo({
    qry: `${qry}&isActive=true`,
  })

  return (
    <Controller
      name='idAnalyst'
      control={control}
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          value={usersInfo?.data.find((user) => user.id === value) || null}
          options={usersInfo?.data || []}
          getOptionLabel={(option) => `${option.firstName ?? ''} ${option.lastName || ''}`}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onInputChange={(_, newValue) => setSearchUser(newValue)}
          onChange={(_, data) => onChange(data?.id)}
          renderInput={(params) => (
            <TextField
              {...params}
              size='small'
              label='Analista'
            />
          )}
          noOptionsText={
            loadingUsers ? (
              <LinearProgress />
            ) : usersInfo?.data === undefined ? (
              'Escribe para buscar'
            ) : (
              'No hay resultados'
            )
          }
        />
      )}
    />
  )
}

export default AutocompleteGetUsers
