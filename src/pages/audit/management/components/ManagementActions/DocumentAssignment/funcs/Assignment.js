export const dataForUpdateProcess = (elementAction, data, showEstimatedDate) => {
  const body = {
    idTaskActionItem: elementAction?.id,
    idTaskRel: elementAction?.TaskRel?.id,
    idAssignedUser: data?.user?.idUser,
    idUserJobTitle: data?.user?.id,
    estimatedCompletion: showEstimatedDate ? data?.estimatedCompletion : null,
    observation: data?.observation,
  }
  return body
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

export const adaptDefaultValuesToAssigment = (formData) => {
  const idUserJobTitle = formData.idUserJobTitle

  const { assignedUserData } = formData

  const userData = {
    hierarchy: assignedUserData?.firstName
      ? `${assignedUserData?.firstName ?? ''} ${assignedUserData?.lastName ?? ''}`
      : '',
    id: idUserJobTitle ?? '',
    idUser: assignedUserData?.id ?? '',
  }
  return {
    user: assignedUserData ? userData : '',
    estimatedCompletion:
      formData?.estimatedCompletion === '' ? new Date() : formData.estimatedCompletion,
    observation: formData?.observation ?? '',
  }
}
