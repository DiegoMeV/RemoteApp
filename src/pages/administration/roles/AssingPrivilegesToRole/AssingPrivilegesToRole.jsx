import { useParams } from 'react-router-dom'
import { ViewAsgToRole } from './view'
import { useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { AccessControl, NoAccessCard, useBoolean, useGetRole, useSubmitRole } from '@/libV4'
import { useStoreActions } from 'easy-peasy'

const AssingPrivilegesToRole = () => {
  const { idRole } = useParams()
  const queryClient = useQueryClient()
  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )
  // TODO: const { setConfirmAlertProps } = useRootStore()
  const modalPrivilege = useBoolean()

  const { data: roleInfo, isLoading: loadingRole } = useGetRole({
    qry: `/${idRole}`,
    enabled: !!idRole,
  })

  const { data: privByRol, isLoading: loadingPriv } = useGetRole({
    qry: `/${idRole}/privileges`,
    enabled: !!idRole,
  })

  const { mutateAsync: deletePrivilege, isPending: isPendingDelete } = useSubmitRole({
    qry: `/${idRole}/privileges`,
    method: 'delete',
    onSuccess: () => {
      toast.success('Privilegio eliminado')
      queryClient.invalidateQueries([`/roles`])
    },
    onError: (e) => {
      toast.error(e?.message ?? 'Error al eliminar privilegio')
    },
  })

  const { mutateAsync: assignNewPriv, isPending: isPendingAssing } = useSubmitRole({
    qry: `/${idRole}/privileges`,
    onSuccess: () => {
      toast.success('Privilegio asignado correctamente')
      queryClient.invalidateQueries([`/roles`])
    },
    onError: (e) => {
      toast.error(e?.message ?? 'Error al asignar privilegio')
    },
  })

  const deletePriv = (data) => {
    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: '¿Está seguro que desea eliminar el privilegio?',
      onConfirm: () => {
        deletePrivilege({ bodyQry: `/${data?.privilegeId}` })
      },
    })
  }

  return (
    <AccessControl
      privilege='usuarios.roles.listar_privilegios'
      nodeContent={<NoAccessCard />}
    >
      <ViewAsgToRole
        roleInfo={roleInfo?.data}
        idRole={idRole}
        loading={loadingRole || loadingPriv || isPendingDelete || isPendingAssing}
        modalPrivilege={modalPrivilege}
        privByRol={privByRol?.data}
        assignNewPriv={assignNewPriv}
        deletePriv={deletePriv}
      />
    </AccessControl>
  )
}

export default AssingPrivilegesToRole
