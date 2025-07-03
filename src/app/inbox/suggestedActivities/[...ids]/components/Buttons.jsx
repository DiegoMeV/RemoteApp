import { BackdropLoading, useSubmitProcess } from '@/lib'
import { Box, Button } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Buttons = ({ ids, rowSelectionModel, parentProcessTasks }) => {
  const selectedId = rowSelectionModel?.[0]
  const matchingTask = parentProcessTasks?.find((task) => task.id === selectedId)

  const id = matchingTask?.idParentProcess

  const [idProcess, idActivity] = ids || []

  const navigate = useNavigate()

  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )
  const queryClient = useQueryClient()
  const companyData = useStoreState((state) => state.company.companyData)

  const handleCancel = () => {
    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: '¿Está seguro de cancelar?',
      content: null,
      onConfirm: () => {
        navigate(`/inbox/${idProcess}/${idActivity}`)
      },
    })
  }

  const { mutateAsync: notifyNextActivity, isPending } = useSubmitProcess({
    qry: `/${idProcess}/activities/${idActivity}/notify-next-task`,
    method: 'put',
    onSuccess: () => {
      toast.success('Actividad notificada correctamente')
      queryClient.invalidateQueries([`/${companyData?.companyId}/inbox`])

      navigate(`/inbox`)
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })

  const handleSave = () => {
    if (rowSelectionModel.length > 0) {
      notifyNextActivity({ body: { idNextTask: rowSelectionModel[0], idParentProcess: id } })
    } else {
      toast.error('Debe seleccionar una tarea')
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        columnGap: 2,
        justifyContent: 'flex-end',
        pt: 2,
      }}
    >
      <BackdropLoading loading={isPending} />
      <Button
        variant='contained'
        color='secondary'
        onClick={handleCancel}
      >
        Cancelar
      </Button>
      <Button
        variant='contained'
        onClick={() => {
          handleSave()
        }}
      >
        Guardar
      </Button>
    </Box>
  )
}

export default Buttons
