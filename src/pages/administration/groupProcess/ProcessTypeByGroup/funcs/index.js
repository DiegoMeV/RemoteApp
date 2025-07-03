import { AccountTree, Circle, Edit } from '@mui/icons-material'
import { IconButton } from '@mui/material'

export const typeProcessColumns = (navigate) => {
  const handleRouterToConstructor = (row) => {
    navigate(`/builder/${row.id}`)
  }

  const handleRouterToEdit = (row) => {
    navigate(`/administration/editTypeProcess/${row.idGroup}/${row.id}`)
  }

  return [
    {
      headerName: '',
      field: 'isEnabled',
      width: 40,
      renderCell: (data) => <Circle color={data?.isEnabled ? 'success' : 'disabled'} />,
    },
    {
      headerName: 'Nombre del tipo de proceso',
      field: 'name',
    },
    {
      headerName: 'Descripción',
      field: 'description',
    },
    {
      headerName: '',
      field: 'options',
      width: 90,
      pinned: 'right',
      renderCell: (data) => {
        return (
          <div className='flex justify-center items-center'>
            <IconButton
              title='Editar'
              onClick={() => handleRouterToEdit(data)}
            >
              <Edit />
            </IconButton>
            <IconButton
              title='Parametrizar'
              onClick={() => handleRouterToConstructor(data)}
            >
              <AccountTree />
            </IconButton>
          </div>
        )
      },
    },
  ]
}
