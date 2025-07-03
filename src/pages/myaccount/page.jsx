import { useStoreActions, useStoreState } from 'easy-peasy'
import { ViewMyAccount } from './views'
import { useForm } from 'react-hook-form'
import { useEditUser, useUploadUserImage } from '@/lib'
import { useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { WithAuth } from '@/app/middleware'

const MyAccount = () => {
  // State and hooks initialization
  const userData = useStoreState((state) => state.user.userData)
  const companyData = useStoreState((state) => state.company.companyData)
  const updateUser = useStoreActions((actions) => actions.user.updateUserData)
  const queryClient = useQueryClient()
  const [file, setFile] = useState([])
  const [activeTab, setActiveTab] = useState('perfil')

  // Custom hook for editing user details
  const { mutateAsync: editUser, isPending: isLoadingEditUser } = useEditUser({
    onSuccess: (e) => {
      updateUser(e?.data)
      queryClient.invalidateQueries(['/auth/user']) // Invalidate and refetch user data on success
      queryClient.invalidateQueries([`${companyData?.companyId}/archivos`])

      toast.success('Usuario actualizado con éxito!')
    },
    onError: () => {
      toast.error('Ups! Hubo un problema')
    },
    idCompanyAccess: companyData?.companyId,
    idUser: userData?.companies?.[0]?.userId,
  })

  // Custom hook for uploading user image
  const { mutateAsync: uploadUserImage, isPending: isLoadingPhotoUser } = useUploadUserImage({
    onSuccess: () => {
      queryClient.invalidateQueries(['/auth/user'])
      toast.success('Imagen actualizada con éxito')
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error || 'Ups! Hubo un problema')
    },
    idCompanyAccess: companyData?.companyId,
  })

  // Form initialization with default values and validation mode
  const form = useForm({
    defaultValues: {
      firstName: userData?.firstName ?? '',
      lastName: userData?.lastName ?? '',
      email: userData?.email ?? '',
      documentType: userData?.documentType ?? 'CC',
      documentId: userData?.documentId ?? '',
      cellPhone: userData?.cellPhone
        ? userData?.cellPhone?.includes('+57')
          ? userData?.cellPhone
          : `+57${userData?.cellPhone}`
        : '+57',
      preferences: {
        avatar: userData?.preferences?.avatar,
      },
      address: userData?.address ?? '',
      department: userData?.department ?? '',
      municipality: userData?.municipality ?? '',
      expeditionPlace: userData?.expeditionPlace ?? '',
    },
    mode: 'all',
    reValidateMode: 'onBlur',
  })

  // Function to handle tab changes
  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue)
  }

  // Function to handle form submission
  const onSubmit = async (data) => {
    try {
      let avatarId

      // Si hay un archivo nuevo, subir la imagen primero
      if (file.length && file[0] !== '') {
        const uploadResponse = await uploadUserImage({ file: file })
        avatarId = uploadResponse?.data[0]?.id ?? avatarId
      }

      // Actualizar data con el nuevo ID del avatar
      const updatedData = {
        ...data,
        preferences: {
          ...data.preferences,
          avatar: file[0] === '' ? [''] : avatarId ?? userData?.preferences?.avatar,
        },
      }

      // Llamar a editUser con los datos actualizados
      await editUser(updatedData)
    } catch (error) {
      console.error(`An error has ocurred: ${error.message}`)
    }
  }

  return (
    <WithAuth>
      <ViewMyAccount
        userData={userData}
        form={form}
        onSubmit={onSubmit}
        isLoadingEditUser={isLoadingEditUser || isLoadingPhotoUser}
        setFile={setFile}
        handleTabChange={handleTabChange}
        activeTab={activeTab}
      />
    </WithAuth>
  )
}

export default MyAccount
