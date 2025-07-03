import { DynamicTableAlert } from '@/app/applications/components'
import { Box } from '@mui/material'
import { AddButton } from '.'

const TableAlerts = ({ columns, rows, loading, modalAlerts }) => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      padding='20px'
      rowGap='10px'
      backgroundColor='backgroundGrey1'
    >
      {/* <SearchTable
        searchText={searchOptions?.searchText}
        onChange={searchOptions?.handleSearchText}
        clearSearch={searchOptions?.clearSearch}
      /> */}
      <AddButton modalAlerts={modalAlerts} />
      <DynamicTableAlert
        columns={columns ?? []}
        rows={rows ?? []}
        loading={loading ?? false}
        height='400px'
      />
    </Box>
  )
}

export default TableAlerts
