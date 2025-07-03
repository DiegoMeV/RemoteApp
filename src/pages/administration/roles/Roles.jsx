import { RoleEdition } from './components'
import { useState } from 'react'
import { Typography } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { columnsRoles } from './funcs/TableColumns'
import {
  AccessControl,
  BasicTitle,
  DataGridCustom,
  DrawerEdition,
  NoAccessCard,
  useBoolean,
  usePrivileges,
} from '@/libV4'
import { useStoreActions } from 'easy-peasy'

const rolTypeText = {
  OPERATIONAL: 'Operacional',
  SYSTEM: 'De sistema',
}

const Roles = () => {
  // const { setVLProps } = useRootStore()
  const setVLProps = useStoreActions((actions) => actions.newValueList.setVLProps)

  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [rowSelected, setRowSelected] = useState()
  const openEdition = useBoolean({
    confirmModalProps: {
      icon: 'warning',
      title: '¿Estás seguro de cancelar la edición de este rol?',
    },
  })

  const openmodal = (rolData) => {
    setVLProps({
      open: true,
      title: `Usuarios asignados a ${rolData?.name} (Rol)`,
      toolbarProps: {
        searchProps: {},
      },
      requestParams: {
        baseKey: 'urlUsers',
        url: `/roles/${rolData?.id}/users`,
        enabled: !!rolData?.id,
      },
      columns: [
        {
          title: 'Nombre',
          dataIndex: 'name',
          render: (_, data) => `${data.firstName ?? ''} ${data.lastName ?? ''}`,
        },
        {
          title: 'Correo',
          dataIndex: 'email',
        },
      ],
    })
  }

  const handleOpenEdition = (data) => {
    openEdition?.handleShow()
    setRowSelected(data)
  }

  const handleOpenUsersByRole = (data) => {
    openmodal(data)
  }

  const handleListPrivileges = (data) => {
    if (data?.id) {
      navigate(`/administration/roles/${data.id}`)
    }
  }

  const editAccess = usePrivileges('usuarios.roles.editar')
  const listPrivAccess = usePrivileges('usuarios.roles.listar_privilegios')

  const columns = columnsRoles({
    rolTypeText,
    handleOpenEdition,
    handleListPrivileges,
    handleOpenUsersByRole,
    editAccess,
    listPrivAccess,
  })

  return (
    <AccessControl
      privilege='usuarios.roles.listar_roles'
      nodeContent={<NoAccessCard />}
    >
      <BasicTitle title='Administración de Roles' />
      <div className='backgroundGray1'>
        <DataGridCustom
          requestProps={{
            baseKey: 'urlUsers',
            url: `/roles`,
          }}
          tableProps={{
            columns: columns,
            scroll: { y: 'calc(100vh - 400px)' },
            divClassName: 'col-span-12 h-[calc(100vh-270px)]',
          }}
          toolbarProps={{
            buttonProps: {
              privilege: 'usuarios.roles.agregar',
              onClick: () => {
                handleOpenEdition(null)
              },
            },
          }}
        />
        {openEdition.show && (
          <DrawerEdition
            open={openEdition.show}
            onClose={() => openEdition.handleShowConfirm()}
            width={600}
            title={
              <Typography
                color='primary'
                variant='h5'
              >
                {rowSelected ? `Edición de rol - ${rowSelected?.name ?? ''}` : 'Creación de rol'}
              </Typography>
            }
          >
            <RoleEdition
              idRole={rowSelected?.id ?? null}
              onClose={() => openEdition.handleShowConfirm()}
              onSuccessFunction={() => {
                openEdition.handleShow()
                queryClient.invalidateQueries([`/roles`])
              }}
            />
          </DrawerEdition>
        )}
      </div>
    </AccessControl>
  )
}

export default Roles
