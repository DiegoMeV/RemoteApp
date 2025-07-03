import { BackdropLoading, BasicTitle, DataGridCustom, usePrivileges } from '@/libV4'
import { ModalPrivileges } from '../components'
import { columnsPrivilegesByRole } from '../funcs'

const ViewAsgToRole = ({
  idRole,
  roleInfo,
  loading,
  modalPrivilege,
  privByRol,
  assignNewPriv,
  deletePriv,
}) => {
  const deletePrivilege = usePrivileges('usuarios.roles.eliminar_privilegio')

  const columns = columnsPrivilegesByRole(deletePriv, deletePrivilege)

  return (
    <>
      <BackdropLoading loading={loading} />
      <BasicTitle
        title={`Asignar privilegios a rol ${roleInfo?.name ? `- ${roleInfo?.name}` : ''}`}
        backpath='/administration/roles'
      />
      <div className='backgroundGray1'>
        <DataGridCustom
          requestProps={{
            baseKey: 'urlUsers',
            url: `/roles/${idRole}/privileges`,
            enabled: !!idRole,
          }}
          tableProps={{
            columns: columns,
            divClassName: 'col-span-12 h-[calc(100vh-270px)]',
          }}
          toolbarProps={{
            buttonProps: {
              privilege: 'usuarios.roles.asignar_privilegios',
              onClick: () => {
                modalPrivilege?.handleShow()
              },
            },
          }}
        />
        {modalPrivilege?.show && (
          <ModalPrivileges
            modalPrivilege={modalPrivilege}
            privByRol={privByRol}
            assignNewPriv={assignNewPriv}
            idRole={idRole}
          />
        )}
      </div>
    </>
  )
}

export default ViewAsgToRole
