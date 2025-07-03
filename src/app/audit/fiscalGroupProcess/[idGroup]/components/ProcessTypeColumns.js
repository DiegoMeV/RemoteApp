import { ClassicIconButton } from '@/lib'
import { AccountTree, Circle, Edit } from '@mui/icons-material'
import { Box } from '@mui/material'

export const processTypeColumns = (handleRouterToEdit, handleRouterToConstructor) => {
  return [
    {
      field: 'isActive',
      headerName: '',
      width: 40,
      renderCell: (params) => {
        return (
          <Box
            display='flex'
            justifyContent='center'
            width='100%'
          >
            <Circle color={params.row.isActive ? 'success' : 'disabled'} />
          </Box>
        )
      },
      sortable: false,
      disableColumnMenu: true,
      hideable: false,
    },
    {
      field: 'nameProcessType',
      headerName: 'Nombre de tipo de proceso',
      width: 200,
      editable: true,
    },

    {
      field: 'description',
      headerName: 'Descripción',
      width: 200,
    },
    {
      field: 'options',
      headerName: '',
      width: 90,
      sortable: false,
      disableColumnMenu: true,
      resizable: false,
      cellClassName: 'actions',
      headerAlign: 'center',
      cellAlign: 'center',
      renderCell: (params) => {
        return (
          <Box
            display='flex'
            justifyContent='center'
            width='100%'
          >
            <>
              <ClassicIconButton
                title='Editar'
                placement='bottom'
                color='secondary'
                onClick={() => handleRouterToEdit(params.row)}
              >
                <Edit />
              </ClassicIconButton>
              <ClassicIconButton
                title='Parametrizar'
                placement='bottom'
                color='secondary'
                onClick={() => handleRouterToConstructor(params.row)}
              >
                <AccountTree />
              </ClassicIconButton>
            </>
          </Box>
        )
      },
      hideable: false,
      filterable: false,
    },
  ]
}
