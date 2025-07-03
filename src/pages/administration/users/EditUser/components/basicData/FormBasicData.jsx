import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Button } from '@mui/material'
import { useStoreState } from 'easy-peasy'
import { BackdropLoading, GenericForm, useMutationDynamicBaseUrl } from '@/libV4'

const FormBasicData = ({ inputs, userInfo, isNew, redirect }) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const companyData = useStoreState((state) => state.company.companyData)

  const defaultValues = inputs.reduce((acc, input) => {
    acc[input.name] = userInfo?.[input.name]
    return acc
  }, {})

  const formBasicData = useForm({
    defaultValues: { ...defaultValues, isActive: userInfo?.isActive ?? true },
  })

  const { mutateAsync: modifyUser, isPending: loadingModification } = useMutationDynamicBaseUrl({
    baseKey: 'urlUsers',
    method: isNew ? 'post' : 'put',
    url: isNew ? '/users' : `/admin/users/${userInfo?.id}`,
    onSuccess: (response) => {
      queryClient.invalidateQueries([`/${companyData?.companyId}/users`])
      toast.success(`Usuario ${isNew ? 'creado' : 'modificado'} correctamente`)
      if (redirect) {
        navigate(`/administration/users/${response?.data?.id}`)
      }
    },
    onError: (e) => {
      toast.error(e?.message ?? 'Error al modificar el usuario')
    },
  })

  const onSubmit = (data) => {
    let newData = { ...data }
    modifyUser({ body: newData })
  }

  return (
    <form
      className='general_form_container'
      onSubmit={formBasicData.handleSubmit(onSubmit)}
    >
      <BackdropLoading loading={loadingModification} />

      <GenericForm
        inputs={inputs}
        control={formBasicData.control}
      />
      <Button
        variant='contained'
        className='xs:col-span-12 lg:col-span-6 lg:col-start-4 xl:col-span-4 xl:col-start-5'
        type='submit'
      >
        Guardar cambios
      </Button>
    </form>
  )
}

export default FormBasicData
