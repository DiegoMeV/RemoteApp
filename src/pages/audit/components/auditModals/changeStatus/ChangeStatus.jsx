import { useMutationDynamicBaseUrl } from '@/lib'
import ViewChangeStatus from './view/ViewChangeStatus'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'
import { processStatusOptions } from '@/pages/audit/constants'
import { useQueryDynamicApi } from '@/libV4'

const ChangeStatus = ({ idProcess, closeModal }) => {
  const {
    data: info,
    isFetching: isLoading,
    isError,
  } = useQueryDynamicApi({
    baseKey: 'urlFiscalizacion',
    url: `/processes/${idProcess}?inclOfficeData=true&inclInspPlanData=true`,
  })
  const queryClient = useQueryClient()

  const { mutateAsync: changeStatusProcess, isPending } = useMutationDynamicBaseUrl({
    url: `/processes/${idProcess}/update-status`,
    method: 'put',
    isCompanyRequest: true,
    baseKey: 'urlFiscalizacion',
    onSuccess: (e) => {
      queryClient.invalidateQueries([`/inbox`])
      toast.success(`Estado del proceso ${e.data?.identifier} actualizado con éxito`)
      closeModal()
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? 'Error al actualizar el estado del proceso')
    },
  })

  const { setValue, handleSubmit, control } = useForm()

  const onSubmit = (data) => {
    if (data.statusSelectProcess === info?.data?.[0]?.status || !data.statusSelectProcess) {
      toast.error('El estado seleccionado es igual al estado actual')
      return
    }
    changeStatusProcess({
      body: { status: data.statusSelectProcess, comment: data.descriptionProcess },
    })
  }

  return (
    <ViewChangeStatus
      infoProcess={info?.data?.[0]}
      isLoading={isLoading}
      isError={isError}
      statusOptions={processStatusOptions}
      setValue={setValue}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      control={control}
      isPending={isPending}
    />
  )
}

export default ChangeStatus
