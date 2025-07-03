export const dataForUpdateProcess = (elementAction, data) => {
  return {
    idTaskActionItem: elementAction?.id,
    idTaskRel: elementAction?.TaskRel?.id,
    idActorType: elementAction?.idActorType,
    idAssignedUser: data?.idUser,
    idUserJobTitle: data?.idJobTitle,
  }
}

export const columnsValueListUsers = [
  {
    field: 'hierarchy',
    headerName: 'Nombre',
    width: 300,
  },
  {
    field: 'jobTitle',
    headerName: 'Cargo',
    width: 300,
  },
  {
    field: 'depencyName',
    headerName: 'Dependencia',
    width: 300,
  },
]

export const adaptDefaultValuesToAddProcessActor = (activityActionItemData, prevActorsAssigned) => {
  const assignedUserData =
    activityActionItemData?.assignedUserData ?? prevActorsAssigned?.[0]?.assignedUserData ?? {}

  const idUserJobTitle =
    activityActionItemData?.idUserJobTitle ??
    prevActorsAssigned?.[0]?.assignedUserData?.jobTitles?.[0]?.id

  const idUser = assignedUserData?.id
  return {
    idJobTitle: idUserJobTitle,
    idUser,
    user: {
      id: idUserJobTitle ?? '',
      idJobTitle: idUserJobTitle,
      idUser,
      hierarchy: ` ${assignedUserData?.firstName ?? ''} ${assignedUserData?.lastName || ''}`,
    },
  }
}
