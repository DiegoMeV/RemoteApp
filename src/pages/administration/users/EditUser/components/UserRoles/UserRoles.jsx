import { Delete, Menu } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import toast from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'
import { useStoreActions } from 'easy-peasy'
import { BackdropLoading, DataGridCustom, useMutationDynamicBaseUrl } from '@/libV4'

const UserRoles = ({ idUser }) => {
  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )
  // const { setVLProps } = useRootStore()
  const setVLProps = useStoreActions((actions) => actions.newValueList.setVLProps)

  const queryClient = useQueryClient()

  const { mutateAsync: modifyRolToUser, isPending: addingRolToUser } = useMutationDynamicBaseUrl({
    baseKey: 'urlUsers',
    url: `/users/${idUser}/roles`,
    onSuccess: () => {
      toast.success('Role modificado correctamente')
      queryClient.invalidateQueries([`/users/${idUser}/roles`])
    },
    onError: (e) => {
      toast.error(e.message ?? 'Error al modificar el role')
    },
  })

  const AddRoles = () => {
    setVLProps({
      open: true,
      columns: [
        {
          title: 'Role',
          dataIndex: 'name',
        },
        {
          title: 'Description',
          dataIndex: 'description',
        },
      ],
      requestParams: {
        baseKey: 'urlUsers',
        url: '/roles',
      },
      selectedOption: (params) => {
        modifyRolToUser({ body: { idRole: params?.id } })
      },
      shouldClose: false,
    })
  }

  const DeleteRole = (params) => {
    setConfirmAlertProps({
      open: true,
      title: '¿Estás seguro de eliminar el rol?',
      icon: 'warning',
      onConfirm: () => {
        modifyRolToUser({
          qry: `/${params?.roleId}`,
          methodBody: 'delete',
          body: { idRole: params?.roleId },
        })
      },
    })
  }

  const showPrivilegesByRole = (params) => {
    setVLProps({
      open: true,
      title: params?.name,
      requestParams: {
        baseKey: 'urlUsers',
        url: `/roles/${params?.roleId}/privileges`,
      },
      columns: [
        {
          title: 'Privilege',
          dataIndex: 'name',
        },
      ],
    })
  }

  return (
    <div>
      <BackdropLoading loading={addingRolToUser} />
      <DataGridCustom
        requestProps={{
          baseKey: 'urlUsers',
          url: `/users/${idUser}/roles`,
        }}
        toolbarProps={{
          buttonProps: {
            onClick: AddRoles,
          },
        }}
        tableProps={{
          columns: [
            {
              headerName: 'Rol',
              field: 'name',
            },
            {
              headerName: 'Description',
              field: 'description',
            },
            {
              headerName: '',
              width: 100,
              pinned: 'right',
              renderCell: (data) => (
                <div className='flex items-center'>
                  <IconButton
                    onClick={() => {
                      DeleteRole(data)
                    }}
                  >
                    <Delete />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      showPrivilegesByRole(data)
                    }}
                  >
                    <Menu />
                  </IconButton>
                </div>
              ),
            },
          ],
          containerProps: {
            className: 'h-[calc(100vh-450px)]',
          },
        }}
      />
    </div>
  )
}

export default UserRoles
