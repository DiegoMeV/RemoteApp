import { Box } from '@mui/material'
import { SearchTableWithRequest } from '@/app/applications/components'
import { DynamicTableAlert } from '@/app/applications/components'

const TableOperationContent = ({ searchOperation, modalOperation, isLoading, columns, rows }) => {
  return (
    <Box
      bgcolor={'backgroundWhite1'}
      borderRadius={2}
      p={2}
      display='flex'
      flexDirection='column'
      gap={2}
    >
      <SearchTableWithRequest
        searchOptions={searchOperation}
        buttonOptions={{
          add: modalOperation?.handleShow,
          label: 'Agregar actuaciones',
        }}
        privilege='cgr.alertas.crear_alertas'
      />
      <DynamicTableAlert
        loading={isLoading}
        columns={columns}
        rows={rows?.data ?? []}
      />
    </Box>
  )
}

export default TableOperationContent
