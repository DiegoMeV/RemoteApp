import { SearchTable, usePrivileges } from '@/lib'
import { Button, Grid } from '@mui/material'

const SearchTableWithRequest = ({ searchOptions, buttonOptions, privilege = '' }) => {
  const hasPrivilege = usePrivileges(privilege)
  return (
    <Grid
      container
      justifyContent='space-between'
    >
      <Grid
        item
        md={buttonOptions ? 8 : 12}
      >
        <SearchTable
          searchText={searchOptions?.searchText}
          onChange={searchOptions?.handleSearchText}
          clearSearch={searchOptions?.clearSearch}
          width='100%'
        />
      </Grid>
      <Grid
        item
        md={3}
      >
        {hasPrivilege && buttonOptions && (
          <Button
            onClick={buttonOptions?.add}
            disabled={buttonOptions?.disabled}
            variant='contained'
            fullWidth
          >
            {buttonOptions?.label ?? ''}
          </Button>
        )}
      </Grid>
    </Grid>
  )
}

export default SearchTableWithRequest
