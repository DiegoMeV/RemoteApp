import { AddCircle, Edit, FileDownloadOutlined } from '@mui/icons-material'
import { Box, Button } from '@mui/material'
import { AvatarColumn } from '../components'
import { ClassicIconButton, GenericChipGlobal } from '@/lib'

export const funcsTableUsers = ({ navigate, addAccess, downloadExcel }) => {
  const buttons = addAccess
    ? [
        {
          title: 'Agregar',
          icon: <AddCircle />,
          onClick: () => {
            navigate('/administration/users/new')
          },
        },
        {
          title: 'Excel',
          icon: <FileDownloadOutlined />,
          onClick: () => {
            downloadExcel()
          },
        },
      ]
    : []
  return { buttons }
}

export const userColumns = ({
  navigate,
  editAccess,
  sendInvitation,
  setIsLoadingAvatar,
  editPassword,
  handleShowChangePassword,
}) => {
  const handleSendInvitation = (userId) => {
    sendInvitation({ body: { userId } })
  }

  const handleEditUser = (userId) => {
    navigate(`/administration/users/${userId}`)
  }

  const columns = [
    {
      field: 'avatar',
      headerName: '',
      width: 60,
      pinned: 'left',
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <AvatarColumn
          idAvatar={params?.preferences?.avatar}
          firstName={params?.firstName}
          setIsLoadingAvatar={setIsLoadingAvatar}
        />
      ),
    },
    {
      field: 'firstName',
      headerName: 'Nombre',
      width: 200,
      valueGetter: (params) => `${params?.firstName ?? ''}`,
    },
    {
      field: 'lastName',
      headerName: 'Apellido',
      width: 200,
      valueGetter: (params) => `${params?.lastName ?? ''}`,
    },
    {
      field: 'email',
      headerName: 'Correo',
      width: 250,
      valueGetter: (params) => `${params?.email ?? ''}`,
    },
    {
      field: 'isActive',
      headerName: 'Estado',
      width: 80,
      renderCell: (params) => <GenericChipGlobal params={params} />,
    },
    ...(editPassword
      ? [
          {
            field: 'passwordChange',
            headerName: 'Modificar contraseña',
            width: 150,
            align: 'center',
            sortable: false,
            // TODO: pinned: 'right',
            renderCell: (params) => (
              <Button
                variant='contained'
                onClick={() => handleShowChangePassword(params)}
              >
                Actualizar
              </Button>
            ),
            hideable: false,
            filterable: false,
          },
        ]
      : []),
    ...(editAccess
      ? [
          {
            field: 'options',
            headerName: '',
            width: 150,
            sortable: false,
            pinned: 'right',
            renderCell: (params) => (
              <Box
                display='flex'
                alignContent='center'
                justifyContent='space-between'
                width='100%'
              >
                <Button
                  variant='contained'
                  onClick={() => handleSendInvitation(params.id)}
                >
                  Invitar
                </Button>
                <ClassicIconButton
                  onClick={() => handleEditUser(params.id)}
                  title='Editar usuario'
                  placement='top'
                  color='secondary'
                >
                  <Edit />
                </ClassicIconButton>
              </Box>
            ),
            hideable: false,
            filterable: false,
          },
        ]
      : []),
  ]

  return columns
}
