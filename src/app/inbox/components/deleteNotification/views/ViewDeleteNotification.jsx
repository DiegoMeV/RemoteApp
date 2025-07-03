import { useForm } from 'react-hook-form'
import { inputsDeleteNotification } from '../constants'
import { GenericForm, MagicString, useMutationDynamicBaseUrl } from '@/lib'
import toast from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'
import { ContainerForm } from '../..'

const ViewDeleteNotification = ({ idProcess, idActivity, handleClose }) => {
  const queryClient = useQueryClient()
  const form = useForm()
  const { mutateAsync: deleteNotification, isPending: loadingDelete } = useMutationDynamicBaseUrl({
    url: `/processes/${idProcess}/activities/${idActivity}`,
    method: 'delete',
    isCompanyRequest: true,
    baseKey: 'urlProcess',
    onSuccess: () => {
      toast.success(MagicString.GENERAL.SUCCESS_MESSAGE)
      handleClose()
      queryClient.invalidateQueries([`/inbox`])
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? MagicString.GENERAL.ERROR_MESSAGE)
      return
    },
  })

  const onSubmit = async (data) => {
    await deleteNotification({ body: data })
  }

  return (
    <ContainerForm
      onClickCancel={handleClose}
      loading={loadingDelete}
      submitForm={form.handleSubmit(onSubmit)}
    >
      <GenericForm
        inputs={inputsDeleteNotification}
        control={form.control}
      />
    </ContainerForm>
  )
}

export default ViewDeleteNotification
