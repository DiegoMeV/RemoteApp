import { useSearch } from '@/lib'
import useGetRolesPagination from '@/lib/api/roles/useGetRolesPagination'
import { Autocomplete, LinearProgress, TextField } from '@mui/material'

const AutoCompleteRoles = ({ formValues, setFormValues }) => {
  const { searchText, handleSearchText } = useSearch()
  const { data: rolesTyped, isLoading } = useGetRolesPagination({ searchText })

  return (
    <Autocomplete
      options={rolesTyped?.data ?? []}
      fullWidth
      getOptionLabel={(option) => option.name}
      value={formValues.rol}
      onChange={(event, newValue) => {
        setFormValues((prev) => ({ ...prev, rol: newValue }))
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder='Roles'
          onChange={(e) => handleSearchText(e.target.value)}
        />
      )}
      noOptionsText={
        isLoading ? (
          <LinearProgress />
        ) : rolesTyped === undefined ? (
          'Escribe para buscar'
        ) : (
          'No hay resultados'
        )
      }
    />
  )
}

export default AutoCompleteRoles
