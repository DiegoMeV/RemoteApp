export const editFunc = async (data, createTeam, editTeam, idEdition) => {
  if (idEdition === 'new') {
    await createTeam({ body: data })
  } else {
    await editTeam({ body: data })
  }
}
