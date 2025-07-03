import { EditOption } from '@/app/applications/components'
import { containerEditOptionAlertTable } from '@/app/applications/components/styles'
import { Box } from '@mui/system'

export const columnsUsingInCategory = () => {
  return [
    { field: 'name', headerName: 'Nombre', width: 200 },
    { field: 'description', headerName: 'Descripción', width: 200 },
    {
      field: 'options',
      headerName: '',
      sortable: false,
      disableColumnMenu: true,
      resizable: false,
      headerAlign: 'center',
      renderCell: () => (
        <Box sx={containerEditOptionAlertTable}>
          <EditOption
            onClick={() => {
              //TODO: Add logic for edit category
            }}
          />
        </Box>
      ),
      hideable: false,
    },
  ]
}
