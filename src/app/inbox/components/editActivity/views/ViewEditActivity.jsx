import {
  GenericForm,
  MagicString,
  useGetProcess,
  useMutationDynamicBaseUrl,
  useMutationOnlyBodyParams,
} from '@/lib'
import { ContainerForm } from '../..'
import { useForm } from 'react-hook-form'
import { inputsEditActivity } from '../constants/inputs'
import toast from 'react-hot-toast'
import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'

const ViewEditActivity = ({ idProcess, idActivity, handleClose }) => {
  const { data: infoActivity, isLoading } = useGetProcess({
    qry: `/${idProcess}/activities/${idActivity}`,
    enabled: !!idActivity && !!idProcess,
  })
  const statusActivity = infoActivity?.data?.[0]?.status
  const form = useForm()
  const queryClient = useQueryClient()

  const { mutateAsync: dynamicRequest, isPending: pendingRequest } = useMutationOnlyBodyParams({})
  const { mutateAsync: updateActivity, isPending: loadingActivityUpdate } =
    useMutationDynamicBaseUrl({
      url: `/processes/${idProcess}/activities/${idActivity}/update-data-tool`,
      method: 'put',
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

  const userByActivity = infoActivity?.data?.[0]?.assignedTo

  useEffect(() => {
    form?.setValue('status', statusActivity)
  }, [statusActivity, form])

  useEffect(() => {
    form?.setValue('assignedTo', '')

    if (userByActivity) {
      dynamicRequest({
        isCompanyRequest: true,
        baseKey: 'urlUsers',
        enabled: !!userByActivity,
        url: `users/${userByActivity}`,
        methodBody: 'get',
        onSuccess: (response) => {
          form.setValue('assignedTo', response?.data ?? '')
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userByActivity, form])

  const onSubmit = async (data) => {
    await updateActivity({ body: { ...data, assignedTo: data?.assignedTo?.id } })
  }

  const inputs = inputsEditActivity({ pendingRequest })

  return (
    <ContainerForm
      onClickCancel={handleClose}
      loading={loadingActivityUpdate ?? isLoading ?? pendingRequest}
      submitForm={form.handleSubmit(onSubmit)}
    >
      <GenericForm
        inputs={inputs}
        control={form.control}
      />
    </ContainerForm>
  )
}

export default ViewEditActivity
