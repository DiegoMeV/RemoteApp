import { useBoolean, useMutationDynamicBaseUrl } from '@/lib'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const useChangePassword = () => {
  const openChangePassword = useBoolean()

  const form = useForm({ mode: 'onChange' })

  const [infoUserSelected, setInfoUserSelected] = useState()

  const handleShow = (user) => {
    setInfoUserSelected(user)
    openChangePassword?.handleShow()
  }

  const { mutateAsync: updateUserPass, isPending: isPendingUserPass } = useMutationDynamicBaseUrl({
    url: `/admin/users`,
    method: 'PUT',
    baseKey: 'urlUsers',
    isCompanyRequest: true,
    onSuccess: () => {
      toast.success('Actualización de contraseña exitosa')
      openChangePassword?.handleShow()
      form?.reset()
    },
    onError: (e) =>
      toast.error(e?.response?.data?.error ?? 'Error al actualizar la contraseña del usuario'),
  })

  const handleSubmitPassUser = async (data) => {
    if (!infoUserSelected?.id) return

    delete data.confirmPassword

    try {
      await updateUserPass({ qry: `/${infoUserSelected?.id}/password`, body: data })
    } catch (error) {
      console.error(`An error has ocurred: ${error?.message}`)
    }
  }

  return {
    form,
    openChangePassword,
    infoUserSelected,
    handleShow,
    handleSubmitPassUser,
    isPendingUserPass,
  }
}

export default useChangePassword
