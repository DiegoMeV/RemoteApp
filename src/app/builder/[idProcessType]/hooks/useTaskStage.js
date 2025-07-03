import { useEffect, useState } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'
import toast from 'react-hot-toast'
import { useActivitiesInfo, useCreateActivities, useDeleteActivity } from '@/lib'
import { actionCountPerTask, structureForCreateTask } from '../funcs'

const useTaskStage = () => {
  const stageSelected = useStoreState((actions) => actions.reactFlowState.stageSelected)
  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )

  const [taskStage, setTaskStage] = useState([])

  const { data: activities, isLoading, isError, refetch: refetchActivities } = useActivitiesInfo()

  const { mutateAsync: createActivity, isPending: loadingCreateActivities } = useCreateActivities({
    onSuccess: (response) => {
      const newTaskStage = {
        ...response?.data,
        // QUITAR QUE ESTE ARRAY GUARDE LOS ACTIONS, SOLO REQUIERO SABER EL NUMERO DE ACTIONS QUE TIENE
        // Actions: [],
      }
      setTaskStage((prevState) => {
        return [...prevState, newTaskStage]
      })
      toast.success(`Se creo ${newTaskStage.name}`)
    },
    onError: (err) => toast.error(err?.response?.data?.error ?? `No se pudo crear una tarea`),
  })

  const { mutateAsync: deleteTask, isPending: loadingDeleteActivities } = useDeleteActivity({
    onSuccess: (response) => {
      const arrTaskDeleted = taskStage.filter((task) => task?.id !== response?.data?.id)
      setTaskStage(arrTaskDeleted)
      toast.success(`Se elimino la tarea: ${response?.data?.name ?? ''}`)
    },
    onError: (err) => toast.error(err?.response?.data?.error ?? `No se pudo eliminar la tarea`),
  })

  const handleAddTask = () => {
    const incrementTask = taskStage.length + 1
    const body = structureForCreateTask(incrementTask)
    createActivity(body)
  }

  const handleDeleteTask = (idTask, nameTask) => {
    // TODO: Guardar el numero de Actions que tiene cada Task para visualizar este mensaje
    const additionalMessage = actionCountPerTask(taskStage, idTask)
    const nameTaskToDelete = nameTask || 'esta tarea sin nombre'

    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: 'Eliminar Tarea',
      content: `¿Está seguro de eliminar ${nameTaskToDelete}? Esta tarea tiene ${additionalMessage}`,
      onConfirm: () => {
        deleteTask({ id: idTask })
      },
    })
  }

  useEffect(() => {
    if (!activities?.success) return
    setTaskStage(activities?.data ?? [])
  }, [activities])

  useEffect(() => {
    if (!stageSelected.id) return
    refetchActivities()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageSelected])

  const stateVariables = {
    taskStage,
    isLoading,
    // TODO: Evaluar que tan necesario es este isLoading
    // isLoading: isFetching,
    loadingCreate: loadingCreateActivities || loadingDeleteActivities,
    isError,
  }
  const stateFuntions = {
    handleAddTask,
    handleDeleteTask,
    refetchActivities,
  }
  return [stateVariables, stateFuntions]
}

export default useTaskStage
