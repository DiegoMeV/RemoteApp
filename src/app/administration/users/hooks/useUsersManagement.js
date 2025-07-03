import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { downloadFile, useMutationDynamicBaseUrl } from '@/lib'
import { funcsTableUsers, userColumns } from '../funcs'
import useChangePassword from './useChangePassword'
import { useDownloadExcel } from '@/libV4'

const useUsersManagement = ({ isActive, editAccess, editPassword, addAccess }) => {
  const navigate = useNavigate()

  const { mutateAsync: sendInvitation, isPending } = useMutationDynamicBaseUrl({
    isCompanyRequest: true,
    baseKey: 'urlUsers',
    url: '/sendInvitation',
    onSuccess: () => {
      toast.success('Invitación enviada')
    },
    onError: (e) => {
      toast.error(e.message)
    },
  })

  const { mutateAsync: downloadExcel, isPending: isPendingDownloadExcel } = useDownloadExcel({
    baseUrl: 'urlUsers',
    url: `/users/downloadExcel/${isActive}`,
    onSuccess: async (blob) => {
      downloadFile(
        blob,
        `Usuarios.xlsx`,
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      )
    },
  })

  const changePassUserParams = useChangePassword()

  const columns = userColumns({
    navigate,
    editAccess,
    sendInvitation,
    editPassword,
    handleShowChangePassword: changePassUserParams?.handleShow,
  })

  const { buttons } = funcsTableUsers({ navigate, addAccess, downloadExcel })

  const usersProps = {
    isPending,
    columns,
    buttons,
    changePassUserParams,
    isPendingDownloadExcel,
  }
  return usersProps
}

export default useUsersManagement
