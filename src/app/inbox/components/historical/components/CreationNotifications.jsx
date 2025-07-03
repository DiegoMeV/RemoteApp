import { useEffect } from 'react'
import { BackdropLoading, GenericForm, useMutationDynamicBaseUrl } from '@/libV4'
import { useForm } from 'react-hook-form'
import { inputsNotification } from '../funcs'
import { Button, Typography } from '@mui/material'
import toast from 'react-hot-toast'

const CreationNotifications = ({ idProcess, infoProcess, handleCloseTab, refetch }) => {
  const process = infoProcess?.data[0]
  const idProcessType = process?.ProcessType?.id

  const form = useForm({
    defaultValues: {
      identifier: process?.identifier ?? '',
      processType: process?.ProcessType?.name ?? '',
    },
  })

  const idTask = form?.watch('idTask')

  const inputs = inputsNotification({ idProcessType, idTask })

  const { mutateAsync: notificateActivity, isPending: notiActiLoading } = useMutationDynamicBaseUrl(
    {
      baseKey: 'urlProcess',
      url: `/processes/${idProcess}/activities`,
      method: 'POST',
      onSuccess: () => {
        toast.success('Se notificó correctamente la actividad')
        refetch()
        handleCloseTab()
      },
      onError: (e) =>
        toast.error(e?.response?.data?.error || e?.message || 'Error al notificar actividad'),
    }
  )

  const onSubmit = (data) => {
    if (!idProcess) return

    notificateActivity({
      body: {
        idTask: data?.idTask?.id,
        assignedTo: data?.assignedTo?.id,
      },
    })
  }

  useEffect(() => {
    form?.setValue('assignedTo', null)
  }, [idTask])

  return (
    <article className='h-full overflow-auto'>
      <BackdropLoading loading={notiActiLoading} />
      <div className='rounded-t-lg rounded-b-none backgroundGray1 border border-t border-l border-r border_color_backgroundGray2 p-4 h-100% overflow-auto'>
        <Typography
          variant='body1'
          color='primary'
          sx={{ fontSize: '18px' }}
        >
          Creación de Notificaciones
        </Typography>
      </div>
      <form
        className='p-4 rounded-b-lg rounded-t-none border border-b border-l border-r border_color_backgroundGray2 shadow-lg'
        onSubmit={form?.handleSubmit(onSubmit)}
      >
        <div className='general_form_container'>
          <GenericForm
            inputs={inputs}
            control={form?.control}
          />
        </div>
        <div className='w-full flex justify-end pt-4'>
          <Button
            variant='contained'
            type='submit'
          >
            Guardar
          </Button>
        </div>
      </form>
    </article>
  )
}

export default CreationNotifications
