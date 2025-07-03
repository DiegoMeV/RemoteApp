export const editFuncCompromises = async (data, editCompromise, createCompromise, compromise) => {
  if (compromise?.isNew) {
    await createCompromise({ body: data })
  } else {
    await editCompromise({ body: data })
  }
}
