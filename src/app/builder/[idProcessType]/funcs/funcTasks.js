export const actionCountPerTask = (taskStage, idTask) => {
  //PENDIENTE
  //PONER EL EASY-PEASY SI LA CURRENTTASK TIENE ACTIONS

  const MINIMUN_SIZE_ACTIONS = 1
  const taskToDelete = taskStage.find((task) => task.id === idTask)
  const messageTask =
    taskToDelete?.Actions?.length === MINIMUN_SIZE_ACTIONS
      ? `${taskToDelete?.Actions?.length ?? 0} accion`
      : `${taskToDelete?.Actions?.length ?? 0} acciones`

  return messageTask
}

export const structureForCreateTask = (incrementTask) => {
  return {
    name: `Tarea ${incrementTask}`,
    description: '',
    shortName: `Tarea ${incrementTask}`,
    taskSpecs: {},
    position: incrementTask,
    idRole: null,
    isEnabled: true,
  }
}
