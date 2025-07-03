import { useParams } from 'react-router-dom'
import { ViewAssToJob } from './view'
import { useState } from 'react'
import { columnsRolesByJobtitle } from './funcs'
import toast from 'react-hot-toast'
import { useBoolean, useGetJobtitle, useSubmitJobtitle } from '@/libV4'
import { useStoreActions } from 'easy-peasy'
import { useQueryClient } from '@tanstack/react-query'

const AssignRolToJobtitle = () => {
  const idJobtitle = useParams()?.idJobtitle
  const queryClient = useQueryClient()

  const [rolInfo, setRolInfo] = useState(null)
  const modalPrivileges = useBoolean()
  const modalToAddRol = useBoolean()
  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )

  const {
    data: JobtitleInfo,
    isFetching: loadingJobtitle,
    isError: errorGettingJobtitle,
  } = useGetJobtitle({
    qry: `/${idJobtitle}`,
    enabled: !!idJobtitle,
  })

  const { mutateAsync: modifyRol, isPending: deletingRol } = useSubmitJobtitle({
    qry: `/${idJobtitle}/roles`,
    onSuccess: () => {
      toast.success('Ajuste realizado con éxito')
      queryClient.invalidateQueries([`/jobTitles/${JobtitleInfo?.id}/roles`])
    },
    onError: (e) => {
      toast.error(e?.message)
    },
  })

  const showPrivileges = (data) => {
    setRolInfo(data)
    modalPrivileges.handleShow()
  }

  const handleAddRol = () => {
    modalToAddRol.handleShow()
  }

  const addRol = (data) => {
    modifyRol({ body: { idRole: data?.id } })
  }

  const deleteRol = (data) => {
    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: '¿Está seguro que desea eliminar el rol?',
      onConfirm: () => {
        modifyRol({ bodyQry: `/${data.roleId ?? ''}`, bodyMethod: 'delete' })
      },
    })
  }

  const columns = columnsRolesByJobtitle(deleteRol, showPrivileges)

  return (
    <ViewAssToJob
      idJobtitle={idJobtitle}
      JobtitleInfo={JobtitleInfo?.data}
      columns={columns}
      loading={loadingJobtitle}
      error={errorGettingJobtitle}
      deletingRol={deletingRol}
      handleAddRol={handleAddRol}
      modalPrivilegeProps={{
        rolInfo,
        modalPrivileges,
      }}
      modalToAddRol={modalToAddRol}
      addRol={addRol}
    />
  )
}

export default AssignRolToJobtitle
