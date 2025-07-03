import { SquareIconButton } from '@/lib'
import { Box, MenuItem, TextField } from '@mui/material'
import { SearchTableWithRequest } from '../../components'

const FilterTableAndAction = ({
  filterValue,
  loading,
  handleChangeFilter,
  addRethus,
  searchRethus,
}) => {
  return (
    <>
      <SearchTableWithRequest
        searchOptions={searchRethus}
        // buttonOptions={{
        //   add: addRethus,
        //   label: 'Generar archivo plano',
        // }}
        // privilege='cgr.alertas.crear_alertas'
      />
      <Box
        display='flex'
        gap={3}
      >
        <TextField
          label={'Filtro'}
          select
          fullWidth
          value={filterValue}
          disabled={loading}
          size='small'
          InputLabelProps={{ shrink: true }}
          onChange={(e) => {
            handleChangeFilter(e)
          }}
          sx={{
            '& .MuiInputBase-root': {
              backgroundColor: 'backgroundWhite1',
            },
          }}
        >
          <MenuItem value={0}>{'Pendientes'}</MenuItem>
          <MenuItem value={1}>{'Generados archivo plano'}</MenuItem>
          <MenuItem value={2}>{'Confirmados por correo'}</MenuItem>
        </TextField>
        {filterValue === 0 && (
          <SquareIconButton
            onClick={addRethus}
            text={'Generar archivo plano'}
            icon='download'
            label='Generar archivo plano'
            size={'small'}
            disabled={loading}
            sx={{
              width: '300px',
              marginLeft: 'auto',
            }}
          />
        )}
      </Box>
    </>
  )
}

export default FilterTableAndAction
